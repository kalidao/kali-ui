import React from 'react'
import { useWriteContract } from 'wagmi'
import { Button } from '@components/ui/button'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { Check } from 'lucide-react'
import ChainGuard from '../ChainGuard'

type ProcessProps = {
  chainId: number
  dao: string
  proposalId: string
}

export default function Process({ chainId, dao, proposalId }: ProcessProps) {
  const { writeContractAsync } = useWriteContract()

  const handleProcess = async () => {
    try {
      await writeContractAsync({
        address: dao as `0x${string}`,
        abi: KALIDAO_ABI,
        functionName: 'processProposal',
        chainId: chainId,
        args: [BigInt(proposalId)],
      })
    } catch (error) {
      console.error('Error processing proposal:', error)
    }
  }

  return (
    <ChainGuard
      fallback={
        <Button
          size="sm"
          variant="secondary"
          className="bg-accent text-accent-foreground"
          disabled={!writeContractAsync}
        >
          <Check className="w-4 h-4 mr-2" />
          Process
        </Button>
      }
    >
      <Button
        size="sm"
        variant="secondary"
        className="bg-accent text-accent-foreground"
        onClick={handleProcess}
        disabled={!writeContractAsync}
      >
        <Check className="w-4 h-4 mr-2" />
        Process
      </Button>
    </ChainGuard>
  )
}
