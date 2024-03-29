import { useRouter } from 'next/router'
import React from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@kalidao/reality'
import DAO_ABI from '@abi/KaliDAO.json'
import ChainGuard from '../ChainGuard'

export default function Cancel({ proposalId }: { proposalId: number }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { config } = usePrepareContractWrite({
    address: dao as `0xstring`,
    abi: DAO_ABI,
    functionName: 'cancelProposal',
    chainId: Number(chainId),
    args: [proposalId],
  })
  const { write } = useContractWrite(config)

  return (
    <ChainGuard fallback={<Button tone="red">Cancel</Button>}>
      <Button size="small" tone="red" onClick={() => write?.()} disabled={!write}>
        Cancel
      </Button>
    </ChainGuard>
  )
}
