import { Avatar, Card, Heading, Skeleton, Spinner, Stack, Stat, Button, IconArrowRight } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { chain, useQuery } from 'wagmi'
import { getDaoInfo } from '@graph/queries'
import { ethers } from 'ethers'
import { formatVotingPeriod } from '@utils/votingPeriod'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { addresses } from '@constants/addresses'
import { AddressZero } from '@ethersproject/constants'
import { useContractRead } from 'wagmi'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import { prettyDate } from '@utils/prettyDate'

const Profile = ({ address, chainId }: DashboardElementProps) => {
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

  if (isSwapLoading || isSwapError) return null

  if (swap && swap?.saleEnds > Date.now()) {
    return null
  }

  return (
    <Card padding="6" width="full">
      <pre
        style={{
          color: 'white',
        }}
      >
        {JSON.stringify(swap, null, 2)}
      </pre>
      <Heading>{prettyDate(new Date(ethers.BigNumber.from(swap?.saleEnds * 1000).toNumber()))}</Heading>
    </Card>
  )
}

export default Profile
