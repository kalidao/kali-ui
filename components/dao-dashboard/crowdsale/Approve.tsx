import { erc20ABI, useContract, useContractWrite, usePrepareContractWrite, useAccount, useSigner } from 'wagmi'
import { Text, Button, Stack, Box } from '@kalidao/reality'
import { addresses } from '../../../constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'

const Approve = ({ info, dao, crowdsale, amount, chainId, symbol }) => {
  const { config, error } = usePrepareContractWrite({
    addressOrName: crowdsale.purchaseAsset,
    contractInterface: erc20ABI,
    chainId,
    functionName: 'approve',
    args: [addresses[chainId].extensions.crowdsale2, ethers.utils.parseEther('1000000000000000000')],
    cacheTime: 2_000,
  })
  const { writeAsync: approve, isSuccess } = useContractWrite(config)
  console.log(crowdsale.purchaseAsset)

  const approveToken = async () => {
    if (!dao || !amount) return

    try {
      approve()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Stack align={'center'}>
      <Button width={'full'} disabled={!approve} onClick={approveToken}>
        Allow KALI to use your {symbol.toUpperCase()}
      </Button>
      {isSuccess && (
        <Stack>
          <Text align={'center'} color={'orange'}>
            {symbol.toUpperCase()} has been approved. Please refresh this page.
          </Text>
        </Stack>
      )}
      {error && <Text variant="warning">An error occurred preparing the transaction: {error.message}</Text>}
    </Stack>
  )
}

export default Approve
