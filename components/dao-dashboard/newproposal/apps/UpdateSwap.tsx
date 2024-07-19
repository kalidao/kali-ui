import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { Textarea } from '@components/ui/textarea'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import KALIACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import { addresses } from '@constants/addresses'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import { ArrowLeft } from 'lucide-react'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import Editor from '@components/editor'
import { ProposalProps } from '../utils/types'
import { createSwapDetails } from './createSwapDetails'

export default function UpdateSwap({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[chainId]['extensions']['crowdsale2']

  const { data: kalidaoToken } = useContractRead({
    address: daoAddress as `0xstring`,
    abi: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })

  const kalidao = useContract({
    address: daoAddress as `0xstring`,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const kaliAccess = useContract({
    address: addresses[chainId]['access2'] as `0xstring`,
    abi: KALIACCESS_ABI,
    signerOrProvider: signer,
  })

  // form states
  const [background, setBackground] = useState()
  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customToken, setCustomToken] = useState('')
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState('')
  const [purchaseMultiplier, setPurchaseMultiplier] = useState('1')
  const [totalLimit, setTotalLimit] = useState(0)
  const [personalLimit, setPersonalLimit] = useState(0)
  const [terms, setTerms] = useState()
  const [crowdsaleEnd, setCrowdsaleEnd] = useState('')
  const [warning, setWarning] = useState('')
  const [isRecorded, setIsRecorded] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [status, setStatus] = useState('')

  const handleValidation = async () => {
    if (!customAccess) {
      setWarning('Please input custom access list.')
      return
    }

    let list = []
    let _customAccess = customAccess.split(', ')

    for (let i = 0; i < _customAccess.length; i++) {
      const address = await fetchEnsAddress(_customAccess[i])

      if (address && address.slice(0, 7) === 'Invalid') {
        setWarning(`${address}.`)
        setIsRecorded(false)
        return
      }

      list.push(address)
    }

    try {
      const tx = await kaliAccess?.createList(list, ethers.utils.formatBytes32String('0x0'), '')
      console.log('tx ', tx)
      setIsRecorded(true)
      setWarning('')
    } catch (e) {
      setWarning('Error recording access list.')
      console.log(e)
    }
  }

  const handleTotalLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const _totalLimit = Number(e.target.value)
    if (_totalLimit > personalLimit) {
      setWarning('')
      setTotalLimit(_totalLimit)
    } else {
      setWarning('Personal swap limit may not be greater than the total swap limit')
    }
  }

  const handleIndividualLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _personalLimit = Number(e.target.value)
    if (_personalLimit > totalLimit) {
      setWarning('Personal swap limit may not be greater than the total swap limit')
    } else {
      setWarning('')
      setPersonalLimit(_personalLimit)
    }
  }

  const handleDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let _deadline = e.target.value

    if (Date.parse(_deadline) < Date.now()) {
      setWarning('Swap cannot end before current time. Please pick another Swap end date.')
    } else {
      _deadline = (Date.parse(_deadline) / 1000).toString()
      setCrowdsaleEnd(_deadline)
    }
  }

  const submit = async () => {
    setStatus('Creating proposal...')
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    setStatus('Validating access...')
    // Crowdsale access list id
    let _purchaseAccess
    if (purchaseAccess === 'public') {
      _purchaseAccess = 0
    } else if (purchaseAccess === 'accredited') {
      _purchaseAccess = 1
    } else {
      try {
        let id = await kaliAccess?.listCount()
        id = ethers.utils.formatUnits(id, 'wei')
        _purchaseAccess = parseInt(id)
      } catch (e) {
        console.log(e)
      }
    }

    setStatus('Validating asset...')
    // Crowdsale asset
    let _tokenToSwap
    let _swapMultiplier
    let decimals
    if (customToken) {
      _tokenToSwap = customToken
      const instance = new ethers.Contract(customToken, erc20ABI, signer)
      decimals = await instance.decimals()

      if (decimals < 18) {
        const decimalsToAdd = 18 - decimals
        _swapMultiplier = ethers.utils.parseUnits(purchaseMultiplier, decimalsToAdd)
      } else {
        _swapMultiplier = purchaseMultiplier
      }
    } else {
      _tokenToSwap = AddressZero
      _swapMultiplier = purchaseMultiplier
    }

    setStatus('Uploading details to IPFS...')
    let detailsHash
    if (!background && !terms) {
      detailsHash = 'none'
    } else {
      detailsHash = await createSwapDetails(daoAddress, chainId, background, terms)

      if (detailsHash == '') {
        setWarning('Error uploading swap details.')
        setStatus('')
        return
      }
    }

    setStatus('Testing limits...')
    // Crowdsale purchase limits
    let _totalLimit
    let _personalLimit
    console.log(totalLimit, personalLimit)
    if (personalLimit > totalLimit) {
      setWarning('Personal swap limit may not be greater than the total swap limit')
      return
    } else {
      _totalLimit = ethers.utils.parseEther(totalLimit.toString())
      _personalLimit = ethers.utils.parseEther(personalLimit.toString())
      setWarning('')
    }

    setStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    // Prop payload
    console.log(
      'Swap Extensions Params - ',
      _purchaseAccess,
      _swapMultiplier,
      _tokenToSwap,
      crowdsaleEnd,
      _totalLimit,
      _personalLimit,
      detailsHash,
    )

    setStatus('Encoding swap details...')
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'uint256', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [_purchaseAccess, _swapMultiplier, _tokenToSwap, crowdsaleEnd, _totalLimit, _personalLimit, detailsHash],
      )
      // console.log(payload)
    } catch (e) {
      setWarning('Error setting the crowdsale proposal.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [0], [payload])

    setStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await kalidao?.propose(
        9, // EXTENSION prop
        docs,
        [crowdsaleAddress],
        [0],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setStatus('Proposed.')
  }

  useEffect(() => {
    if (
      (purchaseAsset == 'eth' || (purchaseAsset == 'custom' && customToken)) &&
      (purchaseAccess == 'public' || purchaseAccess == 'accredited' || (purchaseAccess == 'custom' && customAccess)) &&
      purchaseMultiplier &&
      totalLimit != 0 &&
      personalLimit != 0 &&
      crowdsaleEnd
    ) {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
  }, [
    purchaseAsset,
    customToken,
    purchaseAccess,
    customAccess,
    purchaseMultiplier,
    totalLimit,
    personalLimit,
    crowdsaleEnd,
  ])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Swap</h2>
        <p className="text-sm text-gray-500">
          The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens. To
          update the Swap extension, fill out and submit a new Swap proposal below. Please note, this will overwrite
          existing Swap parameters as soon as this Swap proposal is passed.
        </p>
      </div>

      <Editor label="Why should I swap?" description="Give users a reason to swap." setContent={setBackground} />

      <Select onValueChange={(value) => setPurchaseAsset(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select token to swap" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="eth">Ether</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {purchaseAsset === 'custom' && (
        <Input placeholder="Custom token contract address" onChange={(e) => setCustomToken(e.target.value)} />
      )}

      <Select onValueChange={(value) => setPurchaseAccess(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select swap access" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="accredited">Accredited Investors</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {purchaseAccess === 'custom' && (
        <Textarea
          placeholder="Custom access list (separate ENS/address by single comma, e.g., 'abc.eth, def.eth')"
          onChange={(e) => setCustomAccess(e.target.value)}
        />
      )}

      <Input type="number" placeholder="Swap Ratio" min={1} onChange={(e) => setPurchaseMultiplier(e.target.value)} />

      <Input type="number" placeholder="Total Swap Limit" onChange={handleTotalLimit} />

      <Input type="number" placeholder="Individual swap limit" onChange={handleIndividualLimit} />

      <Input type="datetime-local" placeholder="Swap Ends On" onChange={handleDeadline} />

      <FileUploader
        label="Swap Terms"
        description="You may attach a file (.pdf) with Swap, and Kali will present as a clickwrap for Swap users to accept or decline before swapping."
        setFile={setTerms}
      />

      {warning && (
        <Alert variant="destructive">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}

      {purchaseAccess === 'custom' && (
        <Button onClick={handleValidation} disabled={isRecorded}>
          {isRecorded
            ? `Submitted! Please make sure transaction is recorded onchain before submitting proposal. `
            : 'Record access list onchain'}
        </Button>
      )}

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('appsMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button disabled={!isEnabled} onClick={submit}>
          {status ? status : 'Submit Swap Proposal'}
        </Button>
      </div>
    </div>
  )
}
