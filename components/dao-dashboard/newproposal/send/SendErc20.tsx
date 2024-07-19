import React, { useState } from 'react'
import { useAccount, useNetwork, useContractWrite, erc20ABI, useContractRead } from 'wagmi'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { AddressZero } from '@ethersproject/constants'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { tokens } from '@constants/tokens'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import { ProposalProps } from '../utils/types'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function SendErc20({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { data: daoName } = useContractRead({
    address: dao ? (dao as `0xstring`) : AddressZero,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { isConnected } = useAccount()
  const { chain: activeChain } = useNetwork()

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    error: proposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao as `0xstring`,
    abi: KALIDAO_ABI,
    functionName: 'propose',
  })

  // form
  const [type, setType] = useState('dai')
  const [recipient, setRecipient] = useState(AddressZero)
  const [amount, setAmount] = useState('1')
  const [tokenAddress, setTokenAddress] = useState(AddressZero)

  const { data: tokenDecimals } = useContractRead({
    address: tokenAddress as `0xstring`,
    abi: erc20ABI,
    functionName: 'decimals',
    chainId: Number(chainId),
    watch: true,
  })

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
      const tx = propose?.({
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
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Send ERC20 tokens</h2>
        <p className="text-gray-500">{`Send ERC20 tokens from ${daoName} treasury`}</p>
        <Select onValueChange={(value) => setType(value)} defaultValue={type}>
          <SelectTrigger>
            <SelectValue placeholder="Select asset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dai">DAI</SelectItem>
            <SelectItem value="usdc">USDC</SelectItem>
            <SelectItem value="weth">WETH</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        {type === 'custom' && (
          <Input
            placeholder="ERC20 Contract Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        )}
        <Input placeholder="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        <Input type="number" placeholder="Amount" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('sendMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <ChainGuard>
          <Button onClick={submit} disabled={!propose || isProposePending || isProposeSuccess}>
            {isProposePending ? 'Submitting...' : 'Submit'}
          </Button>
        </ChainGuard>
      </div>
      {isProposeSuccess && <p className="text-green-500">Proposal submitted on chain!</p>}
      {isProposeError && <p className="text-red-500">Error submitting proposal: {proposeError?.message}</p>}
    </div>
  )
}
