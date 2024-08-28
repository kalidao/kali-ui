import React, { useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useAccount, useWriteContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { zeroAddress } from 'viem'
import { Button } from '@components/ui/button'
import { Check, X } from 'lucide-react'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { Address } from 'viem'

// TODO: add actual types
type VoteProps = {
  proposal: any
}

export default function Vote({ proposal }: VoteProps) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const dao = params?.dao as Address

  const { isConnected } = useAccount()

  const { writeContractAsync } = useWriteContract()

  const left =
    new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

  const disabled = proposal['sponsored'] === null || left > 0 ? true : false

  const submitVote = useCallback(
    async (approval: Boolean) => {
      console.log(1)
      if (!proposal || !isConnected) return
      console.log(2)
      try {
        const data = await writeContractAsync({
          address: dao ? (dao as `0x${string}`) : zeroAddress,
          abi: KALIDAO_ABI,
          functionName: 'vote',
          args: [proposal['serial'], Boolean(approval)],
        })
      } catch (e) {
        console.log('error', e)
      }
      console.log(3)
    },
    [isConnected, proposal, writeContractAsync, dao],
  )

  return (
    <div className="flex">
      <ChainGuard
        fallback={
          <Button variant="outline" size="icon" className="bg-green-500 text-white" disabled={disabled}>
            <Check className="h-4 w-4" />
          </Button>
        }
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-green-500 text-white"
          disabled={disabled}
          onClick={() => submitVote(true)}
        >
          <Check className="h-4 w-4" />
        </Button>
      </ChainGuard>
      <ChainGuard
        fallback={
          <Button variant="outline" size="icon" className="bg-red-500 text-white" disabled={disabled}>
            <X className="h-4 w-4" />
          </Button>
        }
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-red-500 text-white"
          disabled={disabled}
          onClick={() => submitVote(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </ChainGuard>
    </div>
  )
}
