import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { erc20ABI, useContract, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input, Select } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import KALIACCESS_ABI from '../../../../abi/KaliAccessManagerV2.json'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { addresses } from '../../../../constants/addresses'
import { tokens } from '../../../../constants/tokens'
import { fetchExtensionStatus } from '../../../../utils/fetchExtensionStatus'
import { Warning } from '../../../../styles/elements'
import { fetchEnsAddress } from '../../../../utils/fetchEnsAddress'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'
import { createProposal } from '../../../tools/createProposal'

export default function SetCrowdsale({ setProposal, title, editor }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: signer } = useSigner()
  const crowdsaleAddress = addresses[daoChainId]['extensions']['crowdsale2']

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const kaliAccess = useContract({
    addressOrName: addresses[daoChainId]['access2'],
    contractInterface: KALIACCESS_ABI,
    signerOrProvider: signer,
  })

  // form
  const [purchaseAsset, setPurchaseAsset] = useState('select')
  const [customAsset, setCustomAsset] = useState(null)
  const [purchaseAccess, setPurchaseAccess] = useState('select')
  const [customAccess, setCustomAccess] = useState('')
  const [accessList, setAccessList] = useState(null)
  const [purchaseMultipler, setPurchaseMultipler] = useState(10)
  const [purchaseLimit, setPurchaseLimit] = useState(1000)
  const [personalLimit, setPersonalLimit] = useState(10)
  const [terms, setTerms] = useState(null)
  const [crowdsaleEnd, setCrowdsaleEnd] = useState('2022-01-01T00:00')
  const [crowdsaleStatus, setCrowdsaleStatus] = useState('fetching...')
  const [toggleCrowdsale, setToggleCrowdsale] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [warning, setWarning] = useState(null)
  const [isRecorded, setIsRecorded] = useState(false)

  useEffect(() => {
    const getCrowdsaleStatus = async () => {
      const status = await fetchExtensionStatus(daoChainId, daoAddress, crowdsaleAddress)
      status ? setCrowdsaleStatus('Active') : setCrowdsaleStatus('Inactive')
    }

    getCrowdsaleStatus()
  }, [])

  const handleValidation = async (e) => {
    e.preventDefault()

    let list = []
    customAccess = customAccess.split(', ')

    console.log(customAccess)

    if (!customAccess) {
      setWarning('Please input custom access list.')
    }

    for (let i = 0; i < customAccess.length; i++) {
      const address = await fetchEnsAddress(daoChainId, customAccess[i])

      if (address && address.slice(0, 7) === 'Invalid') {
        setWarning(`${address}.`)
        setIsRecorded(false)
        return
      }

      list.push(address)
    }
    console.log(list)
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

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    // Activate / Deactivate Crowdsale
    const _toggleCrowdsale = 0
    if (toggleCrowdsale && crowdsaleStatus === 'Inactive') {
      _toggleCrowdsale = 1
    }
    if (toggleCrowdsale && crowdsaleStatus === 'Active') {
      _toggleCrowdsale = 1
    }

    // Crowdsale access list id
    let _purchaseAccess
    if (purchaseAccess === 'public') {
      _purchaseAccess = 0
    } else if (purchaseAccess === 'accredited') {
      _purchaseAccess = 1
    } else {
      // TODO: Consider using multicall to call access manager and
      // crowdsale to prevent access list mismatch
      let id = await kaliAccess.listCount()
      id = ethers.utils.formatUnits(id, 'wei')
      _purchaseAccess = parseInt(id)
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
    console.log('crowdsaleEnd', crowdsaleEnd)

    // Crowdsale terms
    let _terms
    if (terms) {
      _terms = await uploadIpfs(daoAddress, 'Crowdsale Terms', terms)
    } else {
      _terms = 'none'
    }

    // Crowdsale purchase limits
    const _purchaseLimit = ethers.utils.parseEther(purchaseLimit.toString())
    const _personalLimit = ethers.utils.parseEther(personalLimit.toString())

    let docs
    try {
      docs = await createProposal(daoAddress, daoChainId, 9, title, editor.getJSON())
    } catch (e) {
      console.error(e)
      return
    }

    console.log(
      'Proposal Payload - ',
      _purchaseAccess,
      purchaseMultipler,
      _purchaseAsset,
      crowdsaleEnd,
      _purchaseLimit,
      _personalLimit,
      _terms,
    )

    // Prop payload
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [_purchaseAccess, purchaseMultipler, _purchaseAsset, crowdsaleEnd, _purchaseLimit, _personalLimit, _terms],
      )
      console.log(payload)
    } catch (e) {
      setWarning('Error setting the crowdsale proposal.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [_toggleCrowdsale], [payload])

    try {
      if (decimals == 18 || _purchaseAsset == AddressZero) {
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
        css={{
          fontFamily: 'Regular',
        }}
      >
        Customize a crowdsale of DAO tokens
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Current crowdsale status</Label>
          <Text>{crowdsaleStatus}</Text>
        </FormElement>
        <FormElement>
          {crowdsaleStatus === 'Inactive' ? (
            <Label htmlFor="recipient">Activate Crowdsale</Label>
          ) : (
            <Label htmlFor="recipient">Deactivate Crowdsale</Label>
          )}
          <Input
            type={'checkbox'}
            variant="checkbox"
            value={toggleCrowdsale}
            onChange={() => setToggleCrowdsale(!toggleCrowdsale)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="type">Asset</Label>
          <Select
            name="type"
            onChange={(e) => setPurchaseAsset(e.target.value)}
            disabled={crowdsaleStatus === 'Active' && toggleCrowdsale}
          >
            <Select.Item value="select">Select</Select.Item>
            <Select.Item value="eth">ETH</Select.Item>
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
          <Label htmlFor="type">Access</Label>
          <Select
            name="type"
            onChange={(e) => setPurchaseAccess(e.target.value)}
            disabled={crowdsaleStatus === 'Active' && toggleCrowdsale}
          >
            <Select.Item value="select">Select</Select.Item>
            <Select.Item value="public">Public</Select.Item>
            <Select.Item value="accredited">Accredited</Select.Item>
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
          <Label htmlFor="purchaseMultiplier">Purchase multiplier</Label>
          <Input
            name="purchaseMultiplier"
            type="number"
            onChange={(e) => setPurchaseMultipler(e.target.value)}
            disabled={crowdsaleStatus === 'Active' && toggleCrowdsale}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="purchaseLimit">Total purchase limit</Label>
          <Input
            name="purchaseLimit"
            type="number"
            onChange={(e) => setPurchaseLimit(e.target.value)}
            disabled={crowdsaleStatus === 'Active' && toggleCrowdsale}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="personalLimit">Individual purchase limit</Label>
          <Input
            name="personalLimit"
            type="number"
            onChange={(e) => setPersonalLimit(e.target.value)}
            disabled={crowdsaleStatus === 'Active' && toggleCrowdsale}
          />
        </FormElement>

        <FormElement>
          <Label htmlFor="recipient">Crowdsale ends on</Label>
          <Input
            variant="calendar"
            type="datetime-local"
            onChange={(e) => setCrowdsaleEnd(e.target.value)}
            disabled={crowdsaleStatus === 'Active' && toggleCrowdsale}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="tokenAddress">Purchase terms</Label>
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
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
