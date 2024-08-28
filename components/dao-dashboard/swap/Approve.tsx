import { Button } from '@components/ui/button'
import { Check } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import ChainGuard from '../ChainGuard'
import { useSwapStore } from './store'
import { erc20Abi, maxUint248 } from 'viem'

export default function Approve() {
  const swap = useSwapStore((state) => state.swap)
  const token = useSwapStore((state) => state.token)
  const chainId = useSwapStore((state) => state.chainId)
  const setApproved = useSwapStore((state) => state.setApproved)
  const { writeContractAsync } = useWriteContract()
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address && token.address && swap.address && chainId) {
      setApproved(address, token.address, swap.address, chainId)
    }
  }, [isConnected, address, token.address, swap.address, chainId, setApproved])

  const approve = useCallback(async () => {
    if (!writeContractAsync || !isConnected || !address) return
    try {
      const tx = await writeContractAsync({
        address: token.address as `0xstring`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [swap.address as `0xstring`, maxUint248],
      })

      setApproved(address, token.address, swap.address, chainId)
    } catch (e) {
      console.error(e)
    }
  }, [writeContractAsync, setApproved, address, chainId, isConnected, token.address, swap.address])

  return (
    <ChainGuard fallback={<Button className="w-full">Swap</Button>}>
      <Button
        className="w-full flex items-center justify-center"
        onClick={approve}
        disabled={!writeContractAsync || !isConnected}
      >
        <Check className="mr-2 h-4 w-4" />
        Approve Kali to use your {token.symbol}
      </Button>
    </ChainGuard>
  )
}
