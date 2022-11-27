import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Stack, Box, Text, Button, Input, FieldSet, Textarea } from '@kalidao/reality'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import KALIACCESS_ABI from '@abi/KaliAccessManagerV2.json'
import { addresses } from '@constants/addresses'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils'
import { Select } from '@design/Select'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { ProposalProps } from '../utils/types'
import { uploadFile, uploadJSON } from '@utils/ipfs'
import { DateInput } from '@design/DateInput'

export default function SetCrowdsale({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
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
  const [loading, setLoading] = useState(false)
  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customToken, setCustomToken] = useState<string>()
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState<string>()
  const [purchaseMultiplier, setPurchaseMultiplier] = useState<number>()
  const [totalLimit, setTotalLimit] = useState(0)
  const [personalLimit, setPersonalLimit] = useState(0)
  const [terms, setTerms] = useState<File>()
  const [crowdsaleEnd, setCrowdsaleEnd] = useState<string>()
  const [message, setMessage] = useState<string>()
  const [isRecorded, setIsRecorded] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  const handleValidation = async () => {
    if (!customAccess) return

    let list = []
    let customAccessArray = customAccess.split(', ')

    if (!customAccess) {
      setMessage('Please input custom access list.')
    }

    for (let i = 0; i < customAccess.length; i++) {
      const address = await fetchEnsAddress(customAccessArray[i])

      if (address && address.slice(0, 7) === 'Invalid') {
        setMessage(`${address}.`)
        setIsRecorded(false)
        return
      }

      list.push(address)
    }

    try {
      const tx = await kaliAccess.createList(list, ethers.utils.formatBytes32String('0x0'), '')
      console.log('tx ', tx)
      setIsRecorded(true)
      setMessage('')
    } catch (e) {
      setMessage('Error recording access list.')
      console.log(e)
    }
  }

  const handleTotalLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const _totalLimit = Number(e.target.value)
    if (_totalLimit > personalLimit) {
      setMessage('')
      setTotalLimit(_totalLimit)
    } else {
      setMessage('Personal swap limit may not be greater than the total swap limit')
    }
  }

  const handleIndividualLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const _personalLimit = Number(e.target.value)
    if (_personalLimit > totalLimit) {
      setMessage('Personal swap limit may not be greater than the total swap limit')
    } else {
      setMessage('')
      setPersonalLimit(_personalLimit)
    }
  }

  const handleDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let _deadline = e.target.value

    if (Date.parse(_deadline) < Date.now()) {
      setMessage('Swap cannot end before current time. Please pick another Swap end date.')
    } else {
      setMessage('')
      _deadline = (Date.parse(_deadline) / 1000).toString()
      setCrowdsaleEnd(_deadline)
    }
  }

  const submit = async () => {
    setLoading(true)
    if (!purchaseMultiplier || !signer) return
    // Crowdsale access list id

    setMessage('Resolving Access List...')
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

    setMessage('Resolving Assets')
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
        _swapMultiplier = ethers.utils.parseUnits(purchaseMultiplier?.toString(), decimalsToAdd)
      } else {
        _swapMultiplier = purchaseMultiplier
      }
    } else {
      _tokenToSwap = AddressZero
      _swapMultiplier = purchaseMultiplier
    }

    setMessage('Uploading Terms')
    // Crowdsale terms
    let termsHash
    if (terms) {
      termsHash = await uploadFile(terms)

      if (!termsHash) {
        setMessage('Error uploading terms.')
        setLoading(false)
        return
      }
    } else {
      termsHash = 'none'
    }

    setMessage('Verifying limits...')
    // Crowdsale purchase limits
    let _totalLimit
    let _personalLimit

    if (personalLimit > totalLimit) {
      setMessage('Personal swap limit may not be greater than the total swap limit')
      setLoading(false)
      return
    } else {
      _totalLimit = ethers.utils.parseEther(totalLimit.toString())
      _personalLimit = ethers.utils.parseEther(personalLimit.toString())
      setMessage('')
    }

    setMessage('Creating proposal...')
    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, title, content)
      if (!docs) {
        setMessage('Error creating proposal.')
        setLoading(false)
        return
      }
    } catch (e) {
      console.error(e)
      return
    }

    setMessage('Preparing Swap Details...')
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
      setMessage('Error setting the crowdsale proposal.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [0], [payload])
    try {
      setMessage('Sending Proposal...')
      const tx = await kalidao.propose(
        9, // EXTENSION prop
        docs,
        [crowdsaleAddress],
        [1],
        [payload],
      )

      tx.wait(1).then(() => {
        setLoading(false)
        setMessage('Proposal submitted.')
        router.push(`/daos/${chainId}/${daoAddress}/`)
      })
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
    <FieldSet legend="Add Swap">
      <Stack>
        <Text>
          The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens.
        </Text>
        <Text>
          To update the Swap exntension, fill out and submit a new Swap proposal below. Please note, this will overwrite
          existing Swap parameters as soon as this Swap proposal is passed.
        </Text>
        <Select
          label={'Token to Swap'}
          description={`Specify a token, e.g., DAI, to swap for this KaliDAO's token, ${kalidaoToken}`}
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
            label="Token Contract Address"
            name="tokenAddress"
            type="text"
            onChange={(e) => setCustomToken(e.target.value)}
          />
        )}
        <Select
          label="Swap Access"
          description="Is this Swap open to all or only to a select collective of addresses? Public swaps are available to anyone with an Eth address."
          name="type"
          onChange={(e) => setPurchaseAccess(e.target.value)}
          options={[
            {
              label: 'Select',
              value: 'select',
            },
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
            label="Custom access list"
            name="customList"
            placeholder="Separate ENS/address by single comma, e.g., 'abc.eth, def.eth' "
            onChange={(e) => setCustomAccess(e.target.value)}
          />
        )}

        <Input
          label="Swap Ratio"
          description="Specify a rate for each swap. For example, a 5x swap multiplier will swap 5 KaliDAO tokens for 1 Ether or 1 ERC20 token."
          name="purchaseMultiplier"
          type="number"
          min={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPurchaseMultiplier(Number(e.currentTarget.value))}
        />

        <Input
          label="Total Swap Limit"
          description="Specify a total number of KaliDAO tokens available to access"
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
        <DateInput
          label="Swap Ends On"
          description="Specify a time to which this Swap ends"
          onChange={handleDeadline}
        />
        <FileUploader
          label="Terms"
          description="You may attach a file here for terms of this Swap. This will be presented as a clickwrap."
          setFile={setTerms}
        />
        {purchaseAccess === 'custom' && (
          <Button onClick={handleValidation} disabled={isRecorded}>
            {isRecorded ? `Success !` : 'Record access list onchain'}
          </Button>
        )}
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Box>
          <ChainGuard fallback={<Button width="full">Submit</Button>}>
            <Button width={'full'} disabled={!isEnabled} onClick={submit} loading={loading}>
              Submit
            </Button>
          </ChainGuard>
        </Box>
        {message && <Text>{message}</Text>}
      </Stack>
    </FieldSet>
  )
}
