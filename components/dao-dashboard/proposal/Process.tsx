import React from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@design/elements'
import DAO_ABI from '@abi/KaliDAO.json'

type ProcessProps = {
  chainId: number
  dao: string
  proposalId: string
}

export default function Process({ chainId, dao, proposalId }: ProcessProps) {
  const { config, isLoading, error } = usePrepareContractWrite({
    addressOrName: dao,
    contractInterface: DAO_ABI,
    functionName: 'processProposal',
    chainId: chainId,
    args: [proposalId],
    overrides: {
      gasLimit: 2050000,
    },
  })
  const { write } = useContractWrite(config)

  return (
    <Button variant="cta" onClick={() => write?.()} disabled={!write}>
      Process
    </Button>
  )
}
