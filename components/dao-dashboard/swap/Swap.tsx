import { Box, Button } from '@kalidao/reality'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useSwapStore } from './store'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'
import { Warning } from '@design/elements'

const Swap = ({ amount }: { amount: string }) => {
  const swap = useSwapStore((state) => state.swap)
  const dao = useSwapStore((state) => state.dao)
  const token = useSwapStore((state) => state.token)
  const chainId = useSwapStore((state) => state.chainId)
  const consent = useSwapStore((state) => state.consent)
  const setSuccess = useSwapStore((state) => state.setSuccess)

  const { config, isError } = usePrepareContractWrite({
    address: swap.address as `0xstring`,
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
    <Box width="full" gap="2">
      <Button width="full" loading={isLoading} disabled={!write || !consent || isSuccess} onClick={() => write?.()}>
        {isSuccess ? 'Success!' : 'Swap'}
      </Button>
      {isError && <Warning warning={'Invalid.'} />}
    </Box>
  )
}

export default Swap
