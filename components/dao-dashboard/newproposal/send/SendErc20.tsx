import React, { useState } from 'react'
import { useAccount, useNetwork, useContractWrite, erc20ABI, useContractRead } from 'wagmi'
import { Label } from '@design/form-elements'
import { Select } from '@design/form-elements/Select'
import { FieldSet, Text, Input, Button, Stack } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { tokens } from '@constants/tokens'
import Back from '@design/proposal/Back'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'
import { ethers } from 'ethers'
import { AddressZero } from '@ethersproject/constants'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { ProposalProps } from '../utils/types'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

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

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    error: proposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao as string,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
  })

  // form
  const [type, setType] = useState('dai')
  const [recipient, setRecipient] = useState(AddressZero)
  const [amount, setAmount] = useState('1')
  const [tokenAddress, setTokenAddress] = useState(AddressZero)

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
        payload = iface.encodeFunctionData('transfer', [recipient, amt])
        break
      case 'usdc':
        asset = activeChain?.id && tokens[activeChain.id]['USDC']['address']
        amt = ethers.utils.parseUnits(amount, 6)
        payload = iface.encodeFunctionData('transfer', [recipient, amt])
        break
      case 'weth':
        asset = activeChain?.id && tokens[activeChain.id]['WETH']['address']
        amt = ethers.utils.parseUnits(amount, 18)
        payload = iface.encodeFunctionData('transfer', [recipient, amt])
        break
      case 'custom':
        asset = tokenAddress
        amt = ethers.utils.parseUnits(amount, tokenDecimals)
        payload = iface.encodeFunctionData('transfer', [recipient, amt])
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
      const tx = propose({
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
    <Stack>
      <FieldSet
        legend="Send ERC20 tokens"
        description={`Send ERC20 tokens from ${daoName} treasury`}
      >
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
          {type === 'custom' && (
            <Input
              label="ERC20 Contract Address"
              name="tokenAddress"
              type="text"
              inputMode='text'
              placeholder={AddressZero}
              value={tokenAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
            />
        )}
        <Input
          label="Recipient"
          name="recipient"
          type="text"
          inputMode="text"
          placeholder={AddressZero}
          value={recipient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
        />
        <Input
          label="Amount"
          name="amount"
          type="number"
          inputMode="decimal"
          placeholder="0"
          min={0}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
        />
      </FieldSet>
      <Stack direction={'horizontal'} justify="space-between">
        <Back onClick={() => setProposal?.('membersMenu')} />
        <ChainGuard>
          <Button
            center
            variant="primary"
            onClick={submit}
            loading={isProposePending}
            disabled={!propose || isProposePending || isProposeSuccess}
          >
            {isProposePending ? 'Submitting...' : 'Submit'}
          </Button>
          <Text>
            {isProposeSuccess
              ? 'Proposal submitted on chain!'
              : isProposeError && `Error submitting proposal: ${proposeError}`}
          </Text>
        </ChainGuard>
      </Stack>
    </Stack>
  )
}
