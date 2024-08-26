import { useParams } from 'next/navigation'
import React from 'react'
import { useWriteContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import ChainGuard from '../ChainGuard'
import { Button } from '@components/ui/button'
import { Address } from 'viem'

export default function Cancel({ proposalId }: { proposalId: number }) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address
  const { writeContract } = useWriteContract()

  const handleCancel = () => {
    writeContract({
      address: dao as `0xstring`,
      abi: KALIDAO_ABI,
      functionName: 'cancelProposal',
      chainId: Number(chainId),
      args: [BigInt(proposalId)],
    })
  }

  return (
    <ChainGuard fallback={<Button variant="destructive">Cancel</Button>}>
      <Button variant="destructive" onClick={handleCancel}>
        Cancel
      </Button>
    </ChainGuard>
  )
}
