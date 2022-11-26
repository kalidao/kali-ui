import { useRouter } from 'next/router'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@kalidao/reality'
import DAO_ABI from '@abi/KaliDAO.json'
import { ethers } from 'ethers'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

export default function Sponsor({ proposalId }: { proposalId: number }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { config } = usePrepareContractWrite({
    addressOrName: dao ? (dao as string) : ethers.constants.AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'sponsorProposal',
    chainId: Number(chainId),
    args: [proposalId],
  })
  const { write, isLoading } = useContractWrite(config)

  return (
    <ChainGuard fallback={<Button tone="green">Sponsor</Button>}>
      <Button size="small" tone="green" onClick={() => write?.()} disabled={!write} loading={isLoading}>
        Sponsor
      </Button>
    </ChainGuard>
  )
}
