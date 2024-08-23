import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useReadContract, useSigner } from 'wagmi'
import { Input } from '@components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/util'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ArrowLeft } from 'lucide-react'
import FileUploader from '@components/tools/FileUpload'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import KALIACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import { addresses } from '@constants/addresses'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import { createProposal } from '../utils/createProposal'
import Editor from '@components/editor'
import { ProposalProps } from '../utils/types'
import { JSONContent } from '@tiptap/react'
import { createSwapDetails } from './createSwapDetails'
import { Textarea } from '@components/ui/textarea'
import { Button } from '@components/ui/button'

export default function SetSwap({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[chainId]['extensions']['crowdsale2']

  const { data: kalidaoToken } = useReadContract({
    address: daoAddress as `0x${string}`,
    abi: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })

  const kalidao = useContract({
    address: daoAddress as `0x${string}`,
    abi: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const kaliAccess = useContract({
    address: addresses[chainId]['access2'] as `0x${string}`,
    abi: KALIACCESS_ABI,
    signerOrProvider: signer,
  })

  // form states
  const [background, setBackground] = useState<JSONContent>()
  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customToken, setCustomToken] = useState<string>()
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState<string>()
  const [purchaseMultiplier, setPurchaseMultiplier] = useState<string>('1')
  const [totalLimit, setTotalLimit] = useState(0)
  const [personalLimit, setPersonalLimit] = useState(0)
  const [terms, setTerms] = useState<File>()
  const [crowdsaleEnd, setCrowdsaleEnd] = useState<Date>()
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
      console.log('tx ', tx)
      setIsRecorded(true)
      setWarning('')
    } catch (e) {
      setWarning('Error recording access list.')
      console.log(e)
    }
  }

  const handleTotalLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        [
          _purchaseAccess,
          _swapMultiplier,
          _tokenToSwap,
          Math.floor(crowdsaleEnd!.getTime() / 1000),
          _totalLimit,
          _personalLimit,
          detailsHash,
        ],
      )
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
        [1],
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
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
        <CardDescription>
          The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens. To
          update the Swap extension, fill out and submit a new Swap proposal below. Please note, this will overwrite
          existing Swap parameters as soon as this Swap proposal is passed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Editor label="Why should I swap?" description="Give users a reason to swap." setContent={setBackground} />

        <Select onValueChange={(value) => setPurchaseAsset(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eth">Ether</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>

        {purchaseAsset === 'custom' && (
          <Input
            type="text"
            placeholder="Custom token contract address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomToken(e.target.value)}
          />
        )}

        <Select onValueChange={(value) => setPurchaseAccess(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomAccess(e.target.value)}
          />
        )}

        <Input
          type="number"
          min={1}
          placeholder="Swap Ratio"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPurchaseMultiplier(e.target.value)}
        />

        <Input type="number" placeholder="Total Swap Limit" onChange={handleTotalLimit} />

        <Input type="number" placeholder="Individual swap limit" onChange={handleIndividualLimit} />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('w-full justify-start text-left font-normal', !crowdsaleEnd && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {crowdsaleEnd ? format(crowdsaleEnd, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={crowdsaleEnd} onSelect={setCrowdsaleEnd} initialFocus />
          </PopoverContent>
        </Popover>

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
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button className="w-full ml-4" disabled={!isEnabled} onClick={submit}>
            {status ? status : 'Submit Swap Proposal'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
