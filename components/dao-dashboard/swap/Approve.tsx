import { Button } from '@components/ui/button'
import { Check } from 'lucide-react'
import { ethers } from 'ethers'
import { useCallback, useEffect } from 'react'
import { erc20ABI, useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import ChainGuard from '../ChainGuard'
import { useSwapStore } from './store'

export default function Approve() {
  const swap = useSwapStore((state) => state.swap)
  const token = useSwapStore((state) => state.token)
  const chainId = useSwapStore((state) => state.chainId)
  const setApproved = useSwapStore((state) => state.setApproved)
  const { config } = usePrepareContractWrite({
    address: token.address as `0xstring`,
    abi: erc20ABI,
    functionName: 'approve',
    chainId: chainId,
    args: [swap.address as `0xstring`, ethers.constants.MaxUint256],
  })
  const { writeAsync, isSuccess } = useContractWrite(config)
  const { address, isConnected } = useAccount()

  useEffect(() => {
    if (isConnected && address && token.address && swap.address && chainId) {
      setApproved(address, token.address, swap.address, chainId)
    }
  }, [isConnected, address, token.address, swap.address, chainId, setApproved])

  const approve = useCallback(async () => {
    if (!writeAsync || !isConnected || !address) return
    try {
      const tx = await writeAsync()
      tx.wait(1).then(() => {
        setApproved(address, token.address, swap.address, chainId)
      })
    } catch (e) {
      console.error(e)
    }
  }, [writeAsync, setApproved, address, chainId, isConnected, token.address, swap.address])

  return (
    <ChainGuard fallback={<Button className="w-full">Swap</Button>}>
      <Button
        className="w-full flex items-center justify-center"
        onClick={approve}
        disabled={!writeAsync || !isConnected || isSuccess}
      >
        <Check className="mr-2 h-4 w-4" />
        Approve Kali to use your {token.symbol}
      </Button>
    </ChainGuard>
  )
}
