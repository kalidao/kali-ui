import { Button } from '@components/ui/button'
import { useWriteContract } from 'wagmi'
import { useSwapStore } from './store'
import { SWAP_ABI } from '@abi/KaliDAOcrowdsaleV2'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@components/ui/alert'
import { useState } from 'react'
import { Address, parseUnits } from 'viem'

const Swap = ({ amount }: { amount: string }) => {
  const swap = useSwapStore((state) => state.swap)
  const dao = useSwapStore((state) => state.dao)
  const token = useSwapStore((state) => state.token)
  const chainId = useSwapStore((state) => state.chainId)
  const consent = useSwapStore((state) => state.consent)
  const setSuccess = useSwapStore((state) => state.setSuccess)

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const { writeContractAsync } = useWriteContract()

  const handleSwap = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const tx = await writeContractAsync({
        address: swap.address as `0x${string}`,
        abi: SWAP_ABI,
        chainId: chainId,
        functionName: 'callExtension',
        args: [dao.address as Address, parseUnits(amount, token.decimals)],
        value: token.symbol == 'ETH' ? parseUnits(amount, token.decimals) : 0n,
      })

      setSuccess(true)
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-col items-center">
        <Button className="w-full" disabled={!consent || isSuccess} onClick={handleSwap}>
          {isLoading && <span className="loading loading-spinner"></span>}
          {isSuccess ? 'Success!' : 'Swap'}
        </Button>
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Account is not eligible to swap</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default Swap
