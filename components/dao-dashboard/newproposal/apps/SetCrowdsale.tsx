import React, { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Stack, Box, Text, Button, FieldSet, FileInput, Textarea } from '@kalidao/reality'
import { Flex } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import KALIACCESS_ABI from '../../../../abi/KaliAccessManagerV2.json'
import { ipfsCrowdsaleData, ipfsCrowdsaleTerms } from '../../../tools/ipfsHelpers'
import { addresses } from '../../../../constants/addresses'
import { Warning } from '../../../../styles/elements'
import { fetchEnsAddress } from '../../../../utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../utils'
import Editor from '../../../editor'
import { Select } from '@design/Select'
import { Tip } from '@design/Tip'

export default function SetCrowdsale({ setProposal, title, content }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[Number(chainId)]['extensions']['crowdsale2']

  const { data: kalidaoToken } = useContractRead({
    addressOrName: daoAddress as string,
    contractInterface: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })

  const kalidao = useContract({
    addressOrName: daoAddress as string,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const kaliAccess = useContract({
    addressOrName: addresses[Number(chainId)]['access2'],
    contractInterface: KALIACCESS_ABI,
    signerOrProvider: signer,
  })

  // form
  const [background, setBackground] = useState()
  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customToken, setCustomToken] = useState(null)
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState<string>()
  const [purchaseMultiplier, setPurchaseMultiplier] = useState(null)
  const [totalLimit, setTotalLimit] = useState(0)
  const [personalLimit, setPersonalLimit] = useState(0)
  const [terms, setTerms] = useState(null)
  const [crowdsaleEnd, setCrowdsaleEnd] = useState(null)
  const [warning, setWarning] = useState<string>()
  const [isRecorded, setIsRecorded] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const handleValidation = async () => {
    if (!customAccess) return

    let list = []
    let customAccessArray = customAccess.split(', ')

    if (!customAccess) {
      setWarning('Please input custom access list.')
    }

    for (let i = 0; i < customAccess.length; i++) {
      const address = await fetchEnsAddress(customAccessArray[i])

      if (address && address.slice(0, 7) === 'Invalid') {
        setWarning(`${address}.`)
        setIsRecorded(false)
        return
      }

      list.push(address)
    }

    try {
      const tx = await kaliAccess.createList(list, ethers.utils.formatBytes32String('0x0'), '')
      console.log('tx ', tx)
      setIsRecorded(true)
      setWarning('')
    } catch (e) {
      setWarning('Error recording access list.')
      console.log(e)
    }
  }

  const handleTotalLimit = (e) => {
    const _totalLimit = Number(e.target.value)
    if (_totalLimit > personalLimit) {
      setWarning('')
      setTotalLimit(_totalLimit)
    } else {
      setWarning('Personal swap limit may not be greater than the total swap limit')
    }
  }

  const handleIndividualLimit = (e) => {
    const _personalLimit = Number(e.target.value)
    if (_personalLimit > totalLimit) {
      setWarning('Personal swap limit may not be greater than the total swap limit')
    } else {
      setWarning('')
      setPersonalLimit(_personalLimit)
    }
  }

  const handleDeadline = (e: ChangeEvent) => {
    let _deadline = e.target.value

    if (Date.parse(_deadline) < Date.now()) {
      setWarning('Swap cannot end before current time. Please pick another Swap end date.')
    } else {
      _deadline = Date.parse(_deadline) / 1000
      setCrowdsaleEnd(_deadline)
    }
  }

  const submit = async (e) => {
    e.preventDefault()

    // Crowdsale access list id
    let _purchaseAccess
    if (purchaseAccess === 'public') {
      _purchaseAccess = 0
    } else if (purchaseAccess === 'accredited') {
      _purchaseAccess = 1
    } else {
      try {
        let id = await kaliAccess.listCount()
        id = ethers.utils.formatUnits(id, 'wei')
        _purchaseAccess = parseInt(id)
      } catch (e) {
        console.log(e)
      }
    }

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

    // Crowdsale terms
    let termsHash
    if (terms) {
      termsHash = await ipfsCrowdsaleTerms(daoAddress, terms)
    } else {
      termsHash = 'none'
    }

    // Upload background to IPFS
    try {
      await ipfsCrowdsaleData(daoAddress, chainId, background, termsHash)
    } catch (e) {
      console.error(e)
    }

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
      termsHash,
    )

    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'uint256', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [_purchaseAccess, _swapMultiplier, _tokenToSwap, crowdsaleEnd, _totalLimit, _personalLimit, termsHash],
      )
      // console.log(payload)
    } catch (e) {
      setWarning('Error setting the crowdsale proposal.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [0], [payload])

    try {
      setWarning('')
      const tx = await kalidao.propose(
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
    <Box width={'full'}>
      <Stack>
        <Text>
          The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens.
        </Text>
        <Text>
          To update the Swap exntension, fill out and submit a new Swap proposal below. Please note, this will overwrite
          existing Swap parameters as soon as this Swap proposal is passed.
        </Text>
        <Form>
          <FormElement>
            <Flex dir="col" gap="sm">
              <Label>
                "Why should I swap?"
                <Tip label={'Give users a reason to swap.'} />
              </Label>
              <Box width="320">
                <Editor setContent={setBackground} />
              </Box>
            </Flex>
          </FormElement>
          <FormElement>
            <Label htmlFor="type">
              Token to swap{' '}
              <Tip label={`Specify a token, e.g., DAI, to swap for this KaliDAO's token, ${kalidaoToken}`} />
            </Label>
            <Select name="type" onChange={(e) => setPurchaseAsset(e.target.value)}>
              <Select.Item value="select">Select</Select.Item>
              <Select.Item value="eth">Ether</Select.Item>
              <Select.Item value="custom">Custom</Select.Item>
            </Select>
          </FormElement>
          {purchaseAsset === 'custom' && (
            <FormElement>
              <Label htmlFor="tokenAddress">Token contract address</Label>
              <Input name="tokenAddress" type="text" onChange={(e) => setCustomToken(e.target.value)} />
            </FormElement>
          )}
          <FormElement>
            <Label htmlFor="type">
              Swap access
              <Tip label="Is this Swap open to all or only to a select collective of addresses? Public swaps are available to anyone with an Eth address." />
            </Label>
            <Select name="type" onChange={(e) => setPurchaseAccess(e.target.value)}>
              <Select.Item value="select">Select</Select.Item>
              <Select.Item value="public">Public</Select.Item>
              <Select.Item value="accredited">Accredited Investors</Select.Item>
              <Select.Item value="custom">Custom</Select.Item>
            </Select>
          </FormElement>
          {purchaseAccess === 'custom' && (
            <FormElement variant={'vertical'}>
              <Label htmlFor="tokenAddress">Custom access list</Label>
              <Textarea
                label="Custom access list"
                name="customList"
                type="text"
                placeholder="Separate ENS/address by single comma, e.g., 'abc.eth, def.eth' "
                onChange={(e) => setCustomAccess(e.target.value)}
              />
            </FormElement>
          )}
          <FormElement>
            <Label htmlFor="purchaseMultiplier">
              Swap ratio
              <Tip label="Specify a rate for each swap. For example, a 5x swap multiplier will swap 5 KaliDAO tokens for 1 Ether or 1 ERC20 token." />
            </Label>
            <Input
              name="purchaseMultiplier"
              type="number"
              min={1}
              onChange={(e) => setPurchaseMultiplier(e.target.value)}
            />
          </FormElement>
          <FormElement>
            <Label htmlFor="purchaseLimit">
              Total swap limit <Tip label="Specify a total number of KaliDAO tokens available to access " />
            </Label>
            <Input name="purchaseLimit" type="number" onChange={handleTotalLimit} />
          </FormElement>
          <FormElement>
            <Label htmlFor="personalLimit">
              Individual swap limit{' '}
              <Tip label="Specify a total number of KaliDAO tokens available to one address during this Swap" />
            </Label>
            <Input name="personalLimit" type="number" onChange={handleIndividualLimit} />
          </FormElement>

          <FormElement>
            <Label htmlFor="recipient">
              Swap ends on <Tip label="Specify a time to which this Swap ends" />
            </Label>
            <Input variant="calendar" type="datetime-local" onChange={handleDeadline} />
          </FormElement>
          <FormElement>
            <Label htmlFor="tokenAddress">
              Swap terms
              <Tip label="You may attach a file (.pdf, .jpeg) with Swap, and Kali will present as a clickwrap for Swap users to accept or decline before swapping." />
            </Label>
            <Flex gap="sm" align="end" effect="glow">
              <FileUploader setFile={setTerms} />
            </Flex>{' '}
          </FormElement>
          {warning && <Warning warning={warning} />}
          {purchaseAccess === 'custom' && (
            <Button onClick={handleValidation} disabled={isRecorded}>
              {isRecorded ? `Success !` : 'Record access list onchain'}
            </Button>
          )}
          <Back onClick={() => setProposal('appsMenu')} />
          <Box>
            <Button width={'full'} disabled={!isEnabled} onClick={submit}>
              Submit
            </Button>
          </Box>
        </Form>
      </Stack>
    </Box>
  )
}
