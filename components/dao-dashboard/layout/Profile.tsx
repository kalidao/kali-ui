import { Avatar, Card, Heading, Skeleton, Spinner, Stack, Stat, Button, IconArrowRight } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { chain, useQuery } from 'wagmi'
import { getDaoInfo } from '@graph/queries'
import { ethers } from 'ethers'
import { formatVotingPeriod } from '@utils/votingPeriod'
import { DashboardElementProps } from './types'
import Link from 'next/link'

const Profile = ({ address, chainId }: DashboardElementProps) => {
  const router = useRouter()
  const { data, isLoading, isError, error } = useQuery(
    ['daoProfileInfo', chainId, address],
    () => getDaoInfo(chainId, address),
    {
      enabled: !!chainId && !!address,
    },
  )
  const info = data?.data?.daos?.[0]

  if (isLoading)
    return (
      <Skeleton>
        <Card padding="6" shadow hover></Card>
      </Skeleton>
    )

  return (
    <Card padding="6" width="full">
      <Stack
        direction={'horizontal'}
        align={router.asPath === `/daos/${chainId}/${address}` ? 'center' : 'flex-start'}
        justify={router.asPath === `/daos/${chainId}/${address}` ? 'center' : 'space-between'}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack align="center" justify={'center'}>
            <Avatar src="" label="dao profile pic" address={address as string} size="32" />
            <Heading>
              {info?.token?.name} ({info?.token?.symbol})
            </Heading>
            <Stack direction={'horizontal'}>
              <Stat
                label="Total Supply"
                value={info ? parseFloat(ethers.utils.formatUnits(info?.token?.totalSupply, 18)).toFixed(0) : null}
              />
              <Stat label="Voting Period" value={formatVotingPeriod(info?.votingPeriod)} />
            </Stack>
          </Stack>
        )}
        {router.asPath === `/daos/${chainId}/${address}` ? null : (
          <Link href={`/daos/${chainId}/${address}/`}>
            <Button size="small" variant="transparent">
              <IconArrowRight />
            </Button>
          </Link>
        )}
      </Stack>
    </Card>
  )
}

export default Profile
