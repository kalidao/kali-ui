import { usePrepareContractWrite, useContractWrite, useTransaction } from 'wagmi'
import { Button, Flex, Text } from '../../../styles/elements'
import { addresses } from '../../../constants/addresses'
import CROWDSALE_ABI from '../../../abi/KaliDAOcrowdsaleV2.json'
import { ethers } from 'ethers'

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
      gasLimit: 200000,
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
      gasLimit: 200000,
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
    <Flex
      dir="col"
      gap="md"
      css={{
        width: '100%',
      }}
    >
      <Button
        // variant="cta"
        disabled={shouldDisable}
        onClick={buy}
        css={{
          width: '100%',
          height: '3rem',
          fontFamily: 'Regular',
          fontWeight: '800',
          border: '2px solid $gray4',
          borderRadius: '10px',
          '&:hover': {
            color: shouldDisable ? '$none' : 'Black',
            background: shouldDisable ? 'none' : '$gray12',
          },
          '&:active': {
            transform: 'translate(1px, 1px)',
          },
        }}
      >
        {buttonText}
      </Button>
      {isEthSwapSuccess ||
        (isTokenSwapScuccess && (
          <Flex dir="col" gap="sm">
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
              css={{
                fontFamily: 'Regular',
                color: '$amber11',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '0.2rem',
              }}
            >
              View on Explorer
            </Text>
          </Flex>
        ))}
      {isEthSwapError && <Text variant="warning">Error submitting transaction: {ethSwapTxError.message}</Text>}
      {isTokenSwapError && <Text variant="warning">Error submitting transaction: {tokenSwapTxError.message}</Text>}
      {ethSwapError && (
        <Text variant="warning">An error occurred preparing the transaction: {ethSwapError.message}</Text>
      )}
      {tokenSwapError && (
        <Text variant="warning">An error occurred preparing the transaction: {tokenSwapError.message}</Text>
      )}
    </Flex>
  )
}

export default Swap
