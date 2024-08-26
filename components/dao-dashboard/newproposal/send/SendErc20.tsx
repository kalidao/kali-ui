import React, { useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { useParams } from 'next/navigation'
import { ethers } from 'ethers'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { tokens } from '@constants/tokens'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import { ProposalProps } from '../utils/types'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { Address, erc20Abi, zeroAddress } from 'viem'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function SendErc20({ setProposal, title, content }: ProposalProps) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { data: daoName } = useReadContract({
    address: dao ? (dao as `0xstring`) : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })
  const { isConnected, chain: activeChain } = useAccount()

  const { writeContractAsync } = useWriteContract()

  // form
  const [type, setType] = useState('dai')
  const [recipient, setRecipient] = useState<Address>(zeroAddress)
  const [amount, setAmount] = useState('1')
  const [tokenAddress, setTokenAddress] = useState<Address>(zeroAddress)

  const { data: tokenDecimals } = useReadContract({
    address: tokenAddress as `0xstring`,
    abi: erc20Abi,
    functionName: 'decimals',
    chainId: Number(chainId),
    // @todo add wathc
    // watch: true,
  })

  const submit = async () => {
    if (!isConnected && !tokenDecimals) return
    let asset
    let amt
    let payload
    let iface = new ethers.utils.Interface(erc20Abi)

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
      const tx = await writeContractAsync({
        address: dao as `0xstring`,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [
          2, // CALL prop
          docs,
          [asset],
          [0n],
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
            onChange={(e) => setTokenAddress(e.target.value as Address)}
          />
        )}
        <Input placeholder="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value as Address)} />
        <Input type="number" placeholder="Amount" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('sendMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <ChainGuard>
          <Button onClick={submit}>Submit</Button>
        </ChainGuard>
      </div>
    </div>
  )
}
