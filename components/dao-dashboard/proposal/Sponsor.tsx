import { useWriteContract } from 'wagmi'
import { Button } from '@components/ui/button'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { useParams } from 'next/navigation'
import { Address } from 'viem'

export default function Sponsor({ proposalId }: { proposalId: number }) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { writeContractAsync } = useWriteContract()

  const handleSponsor = async () => {
    if (!dao || !chainId) return
    try {
      await writeContractAsync({
        address: dao as `0x${string}`,
        abi: KALIDAO_ABI,
        functionName: 'sponsorProposal',
        chainId: Number(chainId),
        args: [BigInt(proposalId)],
      })
    } catch (error) {
      console.error('Failed to sponsor proposal:', error)
    }
  }

  return (
    <ChainGuard fallback={<Button className="bg-green-500 hover:bg-green-600 text-white">Sponsor</Button>}>
      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={handleSponsor}>
        Sponsor
      </Button>
    </ChainGuard>
  )
}
