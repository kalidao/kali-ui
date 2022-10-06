import { usePrepareContractWrite, useContractWrite, useTransaction } from 'wagmi'
import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'
import { Text, Button, Stack } from '@kalidao/reality'

const Swap = ({ info, dao, symbol, decimals, amount, amountToReceive, chainId, buttonText, shouldDisable }) => {
  const { config: ethSwapConfig, error: ethSwapError } = usePrepareContractWrite({
    addressOrName: addresses[chainId].extensions.crowdsale2,
    contractInterface: CROWDSALE_ABI,
    chainId,
    functionName: 'callExtension',
    args: [dao, 0],
    cacheTime: 2_000,
    overrides: {
      value: amount ? ethers.utils.parseEther(amount.toString()) : 0,
      gasLimit: 300000,
    },
  })

  const { config: tokenSwapConfig, error: tokenSwapError } = usePrepareContractWrite({
    addressOrName: addresses[chainId].extensions.crowdsale2,
    contractInterface: CROWDSALE_ABI,
    chainId,
    functionName: 'callExtension',
    args: [dao, amount ? ethers.utils.parseUnits(amount.toString(), decimals) : 0],
    cacheTime: 2_000,
    overrides: {
      gasLimit: 300000,
    },
  })

  const {
    writeAsync: ethSwap,
    isSuccess: isEthSwapSuccess,
    isError: isEthSwapError,
    data: ethSwapData,
    error: ethSwapTxError,
  } = useContractWrite(ethSwapConfig)
  const {
    writeAsync: tokenSwap,
    isSuccess: isTokenSwapScuccess,
    isError: isTokenSwapError,
    data: tokenSwapData,
    error: tokenSwapTxError,
  } = useContractWrite(tokenSwapConfig)

  const buy = async () => {
    if (!dao || !amount || !decimals) return

    if (symbol === 'ETH') {
      try {
        ethSwap()
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        tokenSwap()
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <Stack align={'center'}>
      <Button width={'full'} disabled={shouldDisable} onClick={buy}>
        {buttonText}
      </Button>
      {isEthSwapSuccess ||
        (isTokenSwapScuccess && (
          <Stack>
            <Text>
              Congratulations! You've swapped {amount} {symbol.toUpperCase()} for {amountToReceive}{' '}
              {info?.token?.symbol.toUpperCase()}.{' '}
            </Text>
            <Text
              as="a"
              href={
                symbol.toUpperCase() === 'eth'
                  ? addresses[chainId]['blockExplorer'] + '/tx/' + ethSwapData.hash
                  : addresses[chainId]['blockExplorer'] + '/tx/' + tokenSwapData.hash
              }
              target="_blank"
            >
              View on Explorer
            </Text>
          </Stack>
        ))}
      {isEthSwapError && <Text color={'orange'}>Error submitting transaction: {ethSwapTxError.message}</Text>}
      {isTokenSwapError && <Text color={'orange'}>Error submitting transaction: {tokenSwapTxError.message}</Text>}
      {ethSwapError && (
        <Text color={'orange'}>An error occurred preparing the transaction: {ethSwapError.message}</Text>
      )}
      {tokenSwapError && (
        <Text color={'orange'}>An error occurred preparing the transaction: {tokenSwapError.message}</Text>
      )}
    </Stack>
  )
}

export default Swap
