import { useRouter } from 'next/router'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@components/ui/button'
import { Loader2 } from 'lucide-react'
import DAO_ABI from '@abi/KaliDAO.json'
import { ethers } from 'ethers'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

export default function Sponsor({ proposalId }: { proposalId: number }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const { config } = usePrepareContractWrite({
    address: dao ? (dao as `0xstring`) : ethers.constants.AddressZero,
    abi: DAO_ABI,
    functionName: 'sponsorProposal',
    chainId: Number(chainId),
    args: [proposalId],
  })
  const { write, isLoading } = useContractWrite(config)

  return (
    <ChainGuard fallback={<Button className="bg-green-500 hover:bg-green-600 text-white">Sponsor</Button>}>
      <Button
        size="sm"
        className="bg-green-500 hover:bg-green-600 text-white"
        onClick={() => write?.()}
        disabled={!write || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sponsoring...
          </>
        ) : (
          'Sponsor'
        )}
      </Button>
    </ChainGuard>
  )
}
