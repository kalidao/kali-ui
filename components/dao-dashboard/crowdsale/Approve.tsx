import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Text, Button, Stack } from '@kalidao/reality'
import { BigNumber } from 'ethers'

type ApproveProps = {
  chainId: number
  tokenAddress: string
  tokenSymbol: string
  approvalFor: string
  approvalAmount: BigNumber
}

const Approve = ({ chainId, tokenAddress, tokenSymbol, approvalFor, approvalAmount }: ApproveProps) => {
  const { config, error } = usePrepareContractWrite({
    addressOrName: tokenAddress,
    contractInterface: erc20ABI,
    chainId,
    functionName: 'approve',
    args: [approvalFor, approvalAmount],
  })
  const { writeAsync: approve, isSuccess } = useContractWrite(config)

  return (
    <Stack align={'center'}>
      <Button width={'full'} disabled={!approve} onClick={() => approve?.()}>
        Allow KALI to use your {tokenSymbol.toUpperCase()}
      </Button>
      {isSuccess && (
        <Stack>
          <Text align={'center'} color={'orange'}>
            {tokenSymbol.toUpperCase()} has been approved. Please refresh this page.
          </Text>
        </Stack>
      )}
      {error && <Text>An error occurred preparing the transaction: {error.message}</Text>}
    </Stack>
  )
}

export default Approve
