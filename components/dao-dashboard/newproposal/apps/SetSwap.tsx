import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Select } from '@design/Select'
import { Stack, Input, Button, FieldSet, Textarea, Text } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import KALIACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils/'
import Editor from '@components/editor'
import { ProposalProps } from '../utils/types'
import { DateInput } from '@design/DateInput'
import { JSONContent } from '@tiptap/react'
import { createSwapDetails } from './createSwapDetails'

export default function SetSwap({ setProposal, title, content }: ProposalProps) {
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

  // form
  const [background, setBackground] = useState<JSONContent>()
  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customToken, setCustomToken] = useState<string>()
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState<string>()
  const [purchaseMultiplier, setPurchaseMultiplier] = useState<string>('1')
  const [totalLimit, setTotalLimit] = useState(0)
  const [personalLimit, setPersonalLimit] = useState(0)
  const [terms, setTerms] = useState<File>()
  const [crowdsaleEnd, setCrowdsaleEnd] = useState<string>()
  const [warning, setWarning] = useState<string>()
  const [isRecorded, setIsRecorded] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [status, setStatus] = useState<string>()

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
      
      setIsRecorded(true)
      setWarning('')
    } catch (e) {
      setWarning('Error recording access list.')
      
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
    } catch (e) {
      setWarning('Error setting the crowdsale proposal.')
      console.log(e)
      return
    }

    setStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await kalidao?.propose(
        9, // EXTENSION prop
        docs,
        [crowdsaleAddress],
        [1],
        [payload],
      )
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
    <FieldSet
      legend="Swap"
      description="The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens. To update the Swap exntension, fill out and submit a new Swap proposal below. Please note, this will overwrite
    existing Swap parameters as soon as this Swap proposal is passed."
    >
      <Editor label="Why should I swap?" description="Give users a reason to swap." setContent={setBackground} />
      <Select
        label="Token to swap"
        description={`Specify a token, e.g., DAI, to swap for this KaliDAO's token, ${kalidaoToken}`}
        name="type"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPurchaseAsset(e.target.value)}
        options={[
          { value: 'select', label: 'Select' },
          { value: 'eth', label: 'Ether' },
          { value: 'custom', label: 'Custom' },
        ]}
      />

      {purchaseAsset === 'custom' && (
        <Input
          label="Custom token contract address"
          name="tokenAddress"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomToken(e.target.value)}
        />
      )}
      <Select
        label="Swap Access"
        description="Is this Swap open to all or only to a select collective of addresses? Public swaps are available to anyone with an Eth address."
        name="type"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPurchaseAccess(e.target.value)}
        options={[
          { value: 'select', label: 'Select' },
          { value: 'public', label: 'Public' },
          { value: 'accredited', label: 'Accredited Investors' },
          { value: 'custom', label: 'Custom' },
        ]}
      />
      {purchaseAccess === 'custom' && (
        <Textarea
          label="Custom access list"
          name="customList"
          description="Separate ENS/address by single comma, e.g., 'abc.eth, def.eth' "
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomAccess(e.currentTarget.value)}
        />
      )}

      <Input
        label="Swap Ratio"
        description="Specify a rate for each swap. For example, a 5x swap multiplier will swap 5 KaliDAO tokens for 1 Ether or 1 ERC20 token."
        name="purchaseMultiplier"
        type="number"
        min={1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPurchaseMultiplier(e.target.value)}
      />

      <Input
        label="Total Swap Limit"
        description="Specify a total number of KaliDAO tokens available to access"
        name="purchaseLimit"
        type="number"
        onChange={handleTotalLimit}
      />

      <Input
        label="Individual swap limit"
        description="Specify a total number of KaliDAO tokens available to one address during this Swap"
        name="personalLimit"
        type="number"
        onChange={handleIndividualLimit}
      />

      <DateInput label="Swap Ends On" description="Specify a time to which this Swap ends" onChange={handleDeadline} />

      <FileUploader
        label="Swap Terms"
        description="You may attach a file (.pdf) with Swap, and Kali will present as a clickwrap for Swap users to accept or decline before swapping."
        setFile={setTerms}
      />

      {warning && <Warning warning={warning} />}
      {purchaseAccess === 'custom' && (
        <Button onClick={handleValidation} disabled={isRecorded}>
          {isRecorded
            ? `Submitted! Please make sure transaction is recorded onchain before submitting proposal. `
            : 'Record access list onchain'}
        </Button>
      )}

      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button width={'full'} disabled={!isEnabled} onClick={submit}>
          {status ? status : 'Submit Swap Proposal'}
        </Button>
      </Stack>
    </FieldSet>
  )
}
