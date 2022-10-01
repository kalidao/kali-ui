import React, { useState } from 'react'
import { useAccount, useNetwork, useContractWrite, erc20ABI, useContractRead } from 'wagmi'
import { Flex, Text, Button } from '@design/elements'
import { Form, FormElement, Label, Input } from '@design/form-elements'
import { Select } from '@design/form-elements/Select'

import { useRouter } from 'next/router'
import { tokens } from '@constants/tokens'
import Back from '@design/proposal/Back'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'
import { ethers } from 'ethers'
import { AddressZero } from '@ethersproject/constants'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { ProposalProps } from '../utils/types'

export default function SendErc20({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: daoName } = useContractRead({
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { isConnected, address } = useAccount()
  const { chain: activeChain } = useNetwork()

  const { write: propose } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
  })

  // form
  const [type, setType] = useState('dai')
  const [recipient, setRecipient] = useState(ethers.constants.AddressZero)
  const [amount, setAmount] = useState('1')
  const [tokenAddress, setTokenAddress] = useState(ethers.constants.AddressZero)

  const { data: tokenDecimals } = useContractRead({
    addressOrName: tokenAddress,
    contractInterface: erc20ABI,
    functionName: 'decimals',
    chainId: Number(chainId),
    watch: true,
  })

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    if (!isConnected && !tokenDecimals) return
    let asset
    let amt
    let payload
    let iface = new ethers.utils.Interface(erc20ABI)

    switch (type) {
      case 'dai':
        asset = activeChain?.id && tokens[activeChain.id]['DAI']['address']
        amt = ethers.utils.parseUnits(amount, 18)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      case 'usdc':
        asset = activeChain?.id && tokens[activeChain.id]['USDC']['address']
        amt = ethers.utils.parseUnits(amount, 6)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      case 'weth':
        asset = activeChain?.id && tokens[activeChain.id]['WETH']['address']
        amt = ethers.utils.parseUnits(amount, 18)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      case 'custom':
        asset = tokenAddress
        amt = ethers.utils.parseUnits(amount, tokenDecimals)
        payload = iface.encodeFunctionData('transfer', [recipient, amount])
        break
      default:
        Error('Invalid type')
    }

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [asset], [0], [payload])

    try {
      const tx = await propose({
        recklesslySetUnpreparedArgs: [
          2, // CALL prop
          docs,
          [asset],
          [0],
          [payload],
        ],
      })
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
          <Select
            name="type"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
            defaultValue={type}
          >
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
            />
          </FormElement>
        )}
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input
            name="recipient"
            type="text"
            defaultValue={recipient}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
          />
        </FormElement>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input
            name="amount"
            type="number"
            defaultValue={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          />
        </FormElement>
        <Back onClick={() => setProposal?.('sendMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
