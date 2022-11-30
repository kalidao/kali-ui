import { Text, Card, Heading, Spinner } from '@kalidao/reality'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { addresses } from '@constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import { erc20ABI, useContractRead, useContractReads } from 'wagmi'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import DAO_ABI from '@abi/KaliDAO.json'

const Swap = ({ address, chainId }: DashboardElementProps) => {
  const {
    data: swap,
    isLoading: isSwapLoading,
    error: swapError,
    isError: isSwapError,
  } = useContractRead({
    addressOrName: chainId ? addresses?.[chainId]?.['extensions']['crowdsale2'] : AddressZero,
    contractInterface: SWAP_ABI,
    chainId: chainId,
    functionName: 'crowdsales',
    args: [address],
  })
  // TODO: Update for IPFS / Other Links
  const tokenContract = {
    addressOrName: swap ? swap?.purchaseAsset : AddressZero,
    contractInterface: erc20ABI,
    chainId: chainId,
  }
  const daoContract = {
    addressOrName: address ? address : AddressZero,
    contractInterface: DAO_ABI,
    chainId: chainId,
  }
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...tokenContract,
        functionName: 'name',
      },
      {
        ...tokenContract,
        functionName: 'symbol',
      },
      {
        ...tokenContract,
        functionName: 'decimals',
      },
      {
        ...daoContract,
        functionName: 'name',
      },
      {
        ...daoContract,
        functionName: 'symbol',
      },
    ],
    enabled: !!swap && swap?.purchaseAsset != AddressZero,
  })
  if (isSwapLoading || isSwapError) return null

  if (swap && swap?.saleEnds > Date.now()) {
    return null
  }
  console.log('swap', swap, data)
  return (
    <Card padding="6">
      <Heading>Swap</Heading>
      {data ? (
        <Text>
          You can swap {data[0]} ({data[1]}) for {data[3]} ({data[4]}) at a rate of 1 {data[1]} for{' '}
          {swap?.purchaseMultiplier.toString()} {data[4]}.
        </Text>
      ) : (
        <Spinner />
      )}
    </Card>
  )
}

export default Swap
