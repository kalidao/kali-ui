import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useContractRead, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input, Select } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import KALIACCESS_ABI from '../../../../abi/KaliAccessManagerV2.json'
import { ipfsCrowdsaleData, ipfsCrowdsaleReceipt, ipfsCrowdsaleTerms } from '../../../tools/ipfsHelpers'
import { addresses } from '../../../../constants/addresses'
import { fetchExtensionStatus } from '../../../../utils/fetchExtensionStatus'
import { Warning } from '../../../../styles/elements'
import { fetchEnsAddress } from '../../../../utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../../../tools/createProposal'
import Editor from '../../../../components/editor'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from '../../../../components/editor/editor.module.css'
import { Tip } from '../../../elements'

export default function SetCrowdsale({ setProposal, title, editor }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[chainId]['extensions']['crowdsale2']

  const { data: kalidaoToken } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'symbol',
    {
      chainId: Number(chainId),
    },
  )

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
  const background = useEditor({
    extensions: [
      StarterKit.configure({
        HTMLAttributes: {
          class: styles.editor,
        },
      }),
    ],
    content: '',
    injectCSS: false,
  })

  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customAsset, setCustomAsset] = useState(null)
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState('')
  const [accessList, setAccessList] = useState(null)
  const [purchaseMultiplier, setPurchaseMultiplier] = useState(10)
  const [purchaseLimit, setPurchaseLimit] = useState(1000)
  const [personalLimit, setPersonalLimit] = useState(10)
  const [terms, setTerms] = useState(null)
  const [receipt, setReceipt] = useState(null)
  const [receiptMessage, setReceiptMessage] = useState(null)
  const [crowdsaleEnd, setCrowdsaleEnd] = useState('2022-01-01T00:00')
  const [isActive, setIsActive] = useState('fetching...')
  const [toggleCrowdsale, setToggleCrowdsale] = useState(null)
  const [warning, setWarning] = useState(null)
  const [isRecorded, setIsRecorded] = useState(false)

  useEffect(() => {
    const getCrowdsaleStatus = async () => {
      const status = await fetchExtensionStatus(chainId, daoAddress, crowdsaleAddress)
      status ? setIsActive('Yes') : setIsActive('No')
    }

    getCrowdsaleStatus()
  }, [])

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
    setAccessList(list)

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
    let _purchaseAsset
    let decimals
    if (customAsset) {
      _purchaseAsset = customAsset
      const instance = new ethers.Contract(customAsset, erc20ABI, signer)
      decimals = await instance.decimals()
    } else {
      _purchaseAsset = AddressZero
    }

    // Crowdsale end time
    crowdsaleEnd = Date.parse(crowdsaleEnd) / 1000

    // Crowdsale terms
    let termsHash
    if (terms) {
      termsHash = await ipfsCrowdsaleTerms(daoAddress, terms)
    } else {
      termsHash = 'none'
    }

    // Crowdsale receipt
    let receiptHash
    if (receipt) {
      receiptHash = await ipfsCrowdsaleReceipt(daoAddress, receipt)
    } else {
      receiptHash = 'none'
    }

    // Crowdsale data
    let crowdsaleData
    try {
      crowdsaleData = await ipfsCrowdsaleData(
        daoAddress,
        chainId,
        background.getJSON(),
        termsHash,
        receiptHash,
        receiptMessage,
      )
    } catch (e) {
      console.error(e)
    }

    // Crowdsale purchase limits
    const _purchaseLimit = ethers.utils.parseEther(purchaseLimit.toString())
    const _personalLimit = ethers.utils.parseEther(personalLimit.toString())

    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      return
    }

    // Activate / Deactivate Crowdsale
    const _toggleCrowdsale = 0
    if (toggleCrowdsale && isActive === 'Inactive') {
      _toggleCrowdsale = 1
    }
    if (toggleCrowdsale && isActive === 'Active') {
      console.log(toggleCrowdsale)
      _toggleCrowdsale = 1
      _purchaseAccess = 0
      purchaseMultiplier = 1
      _purchaseAsset = AddressZero
      crowdsaleEnd = 946702800 // Jan. 1, 2000
      _purchaseLimit = 0
      _personalLimit = 0
      termsHash = 0
    }

    console.log(
      'Crowdsale setExtension() params - ',
      _purchaseAccess,
      purchaseMultiplier,
      _purchaseAsset,
      crowdsaleEnd,
      _purchaseLimit,
      _personalLimit,
      termsHash,
    )

    // Prop payload
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [_purchaseAccess, purchaseMultiplier, _purchaseAsset, crowdsaleEnd, _purchaseLimit, _personalLimit, termsHash],
      )
      console.log(payload)
    } catch (e) {
      setWarning('Error setting the crowdsale proposal.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [_toggleCrowdsale], [payload])

    try {
      if (decimals == 18 || decimals == 6 || _purchaseAsset == AddressZero) {
        setWarning('')
        const tx = await kalidao.propose(
          9, // EXTENSION prop
          docs,
          [crowdsaleAddress],
          [_toggleCrowdsale],
          [payload],
        )
        console.log('tx', tx)
      } else {
        setWarning('Please set a different purchase asset.')
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text
        variant="instruction"
        css={{
          fontFamily: 'Regular',
        }}
      >
        The Swap extension allows anyone to atomically swap Ether or ERC20 tokens, e.g., DAI, for KaliDAO tokens.
      </Text>
      <Text
        variant="instruction"
        css={{
          fontFamily: 'Regular',
        }}
      >
        To enable the Swap exntension, check the "Deactivate Swap" box and fill out the rest to create a Swap proposal.
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Is Swap active?</Label>
          <Text>{isActive}</Text>
        </FormElement>
        <FormElement>
          {isActive === 'Inactive' ? (
            <Label htmlFor="recipient">Activate Swap</Label>
          ) : (
            <Label htmlFor="recipient">Deactivate Swap</Label>
          )}
          <Input
            type={'checkbox'}
            variant="checkbox"
            value={toggleCrowdsale}
            onChange={() => setToggleCrowdsale(!toggleCrowdsale)}
          />
        </FormElement>
        <FormElement>
          <Flex dir="col" gap="sm">
            <Label>
              Swap context
              <Tip label={'Share some context for users to swap'} />
            </Label>
            <Editor editor={background} />
          </Flex>
        </FormElement>
        <FormElement>
          <Label htmlFor="type">
            Token to swap{' '}
            <Tip label={`Specify a token, e.g., DAI, to swap for this KaliDAO's token, ${kalidaoToken}`} />
          </Label>
          <Select
            name="type"
            onChange={(e) => setPurchaseAsset(e.target.value)}
            disabled={isActive === 'Active' && toggleCrowdsale}
          >
            <Select.Item value="select">Select</Select.Item>
            <Select.Item value="eth">Ether</Select.Item>
            <Select.Item value="custom">Custom</Select.Item>
          </Select>
        </FormElement>
        {purchaseAsset === 'custom' && (
          <FormElement>
            <Label htmlFor="tokenAddress">Asset contract address</Label>
            <Input name="tokenAddress" type="text" onChange={(e) => setCustomAsset(e.target.value)} />
          </FormElement>
        )}
        <FormElement>
          <Label htmlFor="type">
            Swap access
            <Tip label="Is this Swap open to all or only to a select collective of addresses?" />
          </Label>
          <Select
            name="type"
            onChange={(e) => setPurchaseAccess(e.target.value)}
            disabled={isActive === 'Active' && toggleCrowdsale}
          >
            <Select.Item value="select">Select</Select.Item>
            <Select.Item value="public">Public</Select.Item>
            <Select.Item value="accredited">Accredited Investors</Select.Item>
            <Select.Item value="custom">Custom</Select.Item>
          </Select>
        </FormElement>
        {purchaseAccess === 'custom' && (
          <FormElement variant={'vertical'}>
            <Label htmlFor="tokenAddress">Custom access list</Label>
            <Input
              as="textarea"
              name="customList"
              type="text"
              placeholder="Separate ENS/address by single comma, e.g., 'abc.eth, def.eth' "
              onChange={(e) => setCustomAccess(e.target.value)}
              css={{ padding: '0.5rem', width: '97%', height: '10vh' }}
            />
          </FormElement>
        )}
        <FormElement>
          <Label htmlFor="purchaseMultiplier">
            Swap multiplier
            <Tip label="Specify a rate for each swap. For example, a 5x swap multiplier will swap 5 KaliDAO tokens for 1 Ether or 1 ERC20 token." />
          </Label>
          <Input
            name="purchaseMultiplier"
            type="number"
            onChange={(e) => setPurchaseMultiplier(e.target.value)}
            disabled={isActive === 'Active' && toggleCrowdsale}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="purchaseLimit">
            Total swap limit{' '}
            <Tip label="Specify a total number of KaliDAO tokens available to previously specified collective during this Swap" />
          </Label>
          <Input
            name="purchaseLimit"
            type="number"
            onChange={(e) => setPurchaseLimit(e.target.value)}
            disabled={isActive === 'Active' && toggleCrowdsale}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="personalLimit">
            Individual swap limit{' '}
            <Tip label="Specify a total number of KaliDAO tokens available to one address during this Swap" />
          </Label>
          <Input
            name="personalLimit"
            type="number"
            onChange={(e) => setPersonalLimit(e.target.value)}
            disabled={isActive === 'Active' && toggleCrowdsale}
          />
        </FormElement>

        <FormElement>
          <Label htmlFor="recipient">
            Swap Ends on <Tip label="Specify a time to which this Swap ends" />
          </Label>
          <Input
            variant="calendar"
            type="datetime-local"
            onChange={(e) => setCrowdsaleEnd(e.target.value)}
            disabled={isActive === 'Active' && toggleCrowdsale}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="tokenAddress">
            Swap Terms
            <Tip label="You may attach a file (.pdf, .jpeg) with Swap, and Kali will present as a clickwrap for Swap users to accept or decline before swapping." />
          </Label>
          <Flex gap="sm" align="end" effect="glow">
            <FileUploader setFile={setTerms} />
          </Flex>{' '}
        </FormElement>

        {/* <FormElement>
          <Label htmlFor="receiptMessage">Message for Contributors</Label>
          <Input
            name="receiptMessage"
            type="text"
            onChange={(e) => setReceiptMessage(e.target.value)}
            disabled={crowdsaleStatus === 'Active' && toggleCrowdsale}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="tokenAddress">Contribution Receipt</Label>
          <Flex gap="sm" align="end" effect="glow">
            <FileUploader setFile={setReceipt} />
          </Flex>{' '}
        </FormElement> */}

        {warning && <Warning warning={warning} />}
        {purchaseAccess === 'custom' && (
          <Button onClick={handleValidation} disabled={isRecorded}>
            {isRecorded ? `Success !` : 'Record access list onchain'}
          </Button>
        )}
        <Back onClick={() => setProposal('appsMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
