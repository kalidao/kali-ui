import { Button } from '@components/ui/button'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useSwapStore } from './store'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@components/ui/alert'

const Swap = ({ amount }: { amount: string }) => {
  const swap = useSwapStore((state) => state.swap)
  const dao = useSwapStore((state) => state.dao)
  const token = useSwapStore((state) => state.token)
  const chainId = useSwapStore((state) => state.chainId)
  const consent = useSwapStore((state) => state.consent)
  const setSuccess = useSwapStore((state) => state.setSuccess)

  const { config, isError } = usePrepareContractWrite({
    address: swap.address as `0x${string}`,
    abi: SWAP_ABI,
    chainId: chainId,
    functionName: 'callExtension',
    args: [dao.address, ethers.utils.parseUnits(amount, token.decimals)],
    overrides: {
      value: token.symbol == 'ETH' ? ethers.utils.parseUnits(amount, token.decimals) : 0,
    },
  })
  const { write, isLoading, isSuccess } = useContractWrite({
    ...config,
    onSuccess: async (tx) => {
      await tx.wait(1).then(() => {
        setSuccess(true)
      })
    },
  })

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-col items-center">
        <Button className="w-full" disabled={!write || !consent || isSuccess} onClick={() => write?.()}>
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
