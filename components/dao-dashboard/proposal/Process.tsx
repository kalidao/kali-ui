import React from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@kalidao/reality'
import DAO_ABI from '@abi/KaliDAO.json'
import { IconCheck } from '@kalidao/reality'

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
    <Button prefix={<IconCheck />} tone="green" onClick={() => write?.()} disabled={!write}>
      Process
    </Button>
  )
}
