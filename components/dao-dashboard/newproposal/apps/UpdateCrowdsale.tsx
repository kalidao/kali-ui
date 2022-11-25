import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Stack, Box, Text, Button, Input, FieldSet, FileInput, Textarea, MediaPicker } from '@kalidao/reality'
import { Select } from '@design/Select'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import KALIACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import { ipfsCrowdsaleData, ipfsCrowdsaleTerms } from '../../../tools/ipfsHelpers'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils'
import Editor from '@components/editor'
import { ProposalProps } from '../utils/types'

export default function UpdateCrowdsale({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[chainId]['extensions']['crowdsale2']

  const { data: kalidaoToken } = useContractRead({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const kaliAccess = useContract({
    addressOrName: addresses[chainId]['access2'],
    contractInterface: KALIACCESS_ABI,
    signerOrProvider: signer,
  })

  // form
  const [background, setBackground] = useState()
  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customToken, setCustomToken] = useState<string>()
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState(null)
  const [purchaseMultiplier, setPurchaseMultiplier] = useState(null)
  const [totalLimit, setTotalLimit] = useState(0)
  const [personalLimit, setPersonalLimit] = useState(0)
  const [terms, setTerms] = useState(null)
  const [crowdsaleEnd, setCrowdsaleEnd] = useState(null)
  const [warning, setWarning] = useState(null)
  const [isRecorded, setIsRecorded] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const handleValidation = async (e) => {
    e.preventDefault()

    let list = []
    customAccess = customAccess.split(', ')

    if (!customAccess) {
      setWarning('Please input custom access list.')
    }

    for (let i = 0; i < customAccess.length; i++) {
      const address = await fetchEnsAddress(chainId, customAccess[i])

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
      setWarning(null)
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

  const handleDeadline = (e) => {
    const _deadline = e.target.value

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
        [0],
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

        <Editor setContent={setBackground} />

        <Select
          label="Token to Swap"
          name="type"
          defaultValue={purchaseAsset}
          onChange={(e) => setPurchaseAsset(e.target.value)}
          options={[
            {
              label: 'Select',
              value: 'select',
            },
            {
              label: 'Ether',
              value: 'eth',
            },
            {
              label: 'Custom',
              value: 'custom',
            },
          ]}
        />

        {purchaseAsset === 'custom' && (
          <Input
            label="Token contract address"
            name="tokenAddress"
            type="text"
            onChange={(e) => setCustomToken(e.target.value)}
          />
        )}
        <Select
          label="Swap Access"
          name="type"
          defaultValue={purchaseAccess}
          onChange={(e) => setPurchaseAccess(e.target.value)}
          options={[
            { label: 'Select', value: 'select' },
            {
              label: 'Public',
              value: 'public',
            },
            {
              label: 'Accredited Investors',
              value: 'accredited',
            },
            {
              label: 'Custom',
              value: 'custom',
            },
          ]}
        />

        {purchaseAccess === 'custom' && (
          <Textarea
            label=""
            name="customList"
            placeholder="Separate ENS/address by single comma, e.g., 'abc.eth, def.eth' "
            onChange={(e) => setCustomAccess(e.target.value)}
          />
        )}

        <Input
          label="Swap Ratio"
          description={
            'Specify a rate for each swap. For example, a 5x swap multiplier will swap 5 KaliDAO tokens for 1 Ether or 1 ERC20 token.'
          }
          name="purchaseMultiplier"
          type="number"
          min={1}
          onChange={(e) => setPurchaseMultiplier(e.target.value)}
        />
        <Input
          label="Total Swap Limit"
          description={'Specify a total number of KaliDAO tokens available to access.'}
          name="purchaseLimit"
          type="number"
          onChange={handleTotalLimit}
        />

        <Input
          label="Individual Swap Limit"
          description="Specify a total number of KaliDAO tokens available to one address during this Swap"
          name="personalLimit"
          type="number"
          onChange={handleIndividualLimit}
        />

        <Input
          label="Swap Ends On"
          description="Specify a time to which this Swap ends"
          variant="calendar"
          type="datetime-local"
          onChange={handleDeadline}
        />
        <Stack>
          <Text>Swap terms</Text>
          <Text>
            You may attach a file(pdf) with Swap, and Kali will present as a clickwrap for Swap users to accept or
            decline before swapping.
          </Text>
          <FileUploader setFile={setTerms} />
        </Stack>

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
      </Stack>
    </Box>
  )
}
