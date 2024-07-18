import React from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@components/ui/button'
import DAO_ABI from '@abi/KaliDAO.json'
import { Check } from 'lucide-react'
import ChainGuard from '../ChainGuard'

type ProcessProps = {
  chainId: number
  dao: string
  proposalId: string
}

export default function Process({ chainId, dao, proposalId }: ProcessProps) {
  const { config } = usePrepareContractWrite({
    address: dao as `0xstring`,
    abi: DAO_ABI,
    functionName: 'processProposal',
    chainId: chainId,
    args: [proposalId],
  })
  const { write } = useContractWrite(config)

  return (
    <ChainGuard
      fallback={
        <Button size="sm" variant="secondary" className="bg-accent text-accent-foreground" disabled={!write}>
          <Check className="w-4 h-4 mr-2" />
          Process
        </Button>
      }
    >
      <Button
        size="sm"
        variant="secondary"
        className="bg-accent text-accent-foreground"
        onClick={() => write?.()}
        disabled={!write}
      >
        <Check className="w-4 h-4 mr-2" />
        Process
      </Button>
    </ChainGuard>
  )
}
