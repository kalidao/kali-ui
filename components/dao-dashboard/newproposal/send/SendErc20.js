import React, { useState } from 'react'
import { useAccount, useNetwork, useContract, useSigner, erc20ABI, useContractRead } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import { ethers } from 'ethers'
import { Select } from '../../../../styles/form-elements/Select'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import { tokens } from '../../../../constants/tokens'
import Back from '../../../../styles/proposal/Back'

export default function SendErc20({ setProposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: daoName, isLoading } = useContractRead(
    {
      addressOrName: daoAddress,
      contractInterface: KALIDAO_ABI,
    },
    'name',
    {
      chainId: Number(daoChainId),
    },
  )
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [type, setType] = useState('dai')
  const [recipient, setRecipient] = useState(null)
  const [amount, setAmount] = useState(null)
  const [tokenAddress, setTokenAddress] = useState(null)
  const [tokenDecimals, setTokenDecimals] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const handleTokenAddress = async (_tokenAddress) => {
    setTokenAddress(_tokenAddress)

    const tokenInstance = new ethers.Contract(_tokenAddress, erc20ABI, signer)
    const decimals = await tokenInstance.decimals()
    setTokenDecimals(decimals)
  }

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    let asset
    let payload
    let iface = new ethers.utils.Interface(erc20ABI)

    switch (type) {
      case 'dai':
        asset = activeChain?.id && tokens[activeChain.id]['DAI']['address']
        amount = ethers.utils.parseUnits(amount, 18)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      case 'usdc':
        asset = activeChain?.id && tokens[activeChain.id]['USDC']['address']
        amount = ethers.utils.parseUnits(amount, 6)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      case 'weth':
        asset = activeChain?.id && tokens[activeChain.id]['WETH']['address']
        amount = ethers.utils.parseUnits(amount, 18)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      case 'custom':
        asset = tokenAddress
        amount = ethers.utils.parseUnits(amount, tokenDecimals)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      default:
        Error('Invalid type')
    }

    let docs
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Send ERC20 Proposal', file)
    } else {
      docs = description
    }

    console.log('Proposal Params - ', 2, docs, [asset], [0], [payload])

    try {
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [asset],
        [0],
        [payload],
      )
      console.log('tx', tx)
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
        Send ERC20s from {daoName} treasury
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="type">Asset</Label>
          <Select name="type" onChange={(e) => setType(e.target.value)} defaultValue={type}>
            <Select.Item value="dai">DAI</Select.Item>
            <Select.Item value="usdc">USDC</Select.Item>
            <Select.Item value="weth">WETH</Select.Item>
            <Select.Item value="custom">Custom</Select.Item>
          </Select>
        </FormElement>
        {type === 'custom' && (
          <FormElement>
            <Label htmlFor="tokenAddress">Contract Address</Label>
            <Input
              name="tokenAddress"
              type="text"
              defaultValue={tokenAddress}
              onChange={(e) => handleTokenAddress(e.target.value)}
            />
          </FormElement>
        )}
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input name="recipient" type="text" defaultValue={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input name="amount" type="number" defaultValue={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormElement>
        <Back onClick={() => setProposal('sendMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
