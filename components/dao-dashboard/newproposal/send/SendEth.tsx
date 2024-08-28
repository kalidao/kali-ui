import React, { useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { useParams } from 'next/navigation'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import { ProposalProps } from '../utils/types'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { Address, parseEther, zeroAddress } from 'viem'

export default function SendEth({ setProposal, title, content }: ProposalProps) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { data: daoName } = useReadContract({
    address: dao ? (dao as `0xstring`) : zeroAddress,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  const { writeContractAsync } = useWriteContract()

  const [recipient, setRecipient] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [isProposeSuccess, setIsProposeSuccess] = useState(false)
  const [isProposeError, setIsProposeError] = useState(false)
  const [proposeError, setProposeError] = useState<Error | null>(null)
  const [isProposePending, setIsProposePending] = useState(false)

  const submit = async () => {
    if (!amount) return
    let amt = parseEther(amount.toString())

    if (!recipient) {
      console.error('Recipient address is required')
      return
    }

    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 2, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log('Proposal Params - ', 2, docs, [recipient], [amt], [Array(0)])

    try {
      setIsProposePending(true)
      const tx = await writeContractAsync({
        address: dao as `0xstring`,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [2, docs, [recipient as Address], [amt], []],
      })
      console.log('tx', tx)
      setIsProposeSuccess(true)
    } catch (e) {
      console.log('error', e)
      setIsProposeError(true)
      setProposeError(e as Error)
    } finally {
      setIsProposePending(false)
    }
  }

  return (
    <div className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Send Ether</legend>
        <p className="text-sm text-gray-500">{`Send Ether from ${daoName} treasury`}</p>
        <Input
          placeholder={zeroAddress}
          value={recipient}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
          className="w-full"
        />
        <Input
          type="number"
          inputMode="decimal"
          placeholder="0"
          min={0}
          value={amount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          className="w-full"
        />
      </fieldset>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('sendMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <ChainGuard>
          <Button onClick={submit} disabled={isProposePending || isProposeSuccess}>
            {isProposePending ? 'Submitting...' : 'Submit'}
          </Button>
        </ChainGuard>
        <p className="text-sm">
          {isProposeSuccess
            ? 'Proposal submitted on chain!'
            : isProposeError && `Error submitting proposal: ${proposeError?.message}`}
        </p>
      </div>
    </div>
  )
}
