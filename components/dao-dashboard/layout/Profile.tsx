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

  if (isLoading) return <Skeleton>
    <Card padding="6" shadow hover>
      </Card>
  </Skeleton>

 
  console.log('router', router.asPath === `/daos/${chainId}/${address}`)
  return (
    <Card padding="6" width="full">
      {isLoading ? (
        <Spinner />
      ) : (
        <Link href={`/daos/${chainId}/${address}/`}>
        <Stack align="center">
          <Avatar src="" label="dao profile pic" address={address as string} size="32" />
            <Heading>
              {info?.token?.name} ({info?.token?.symbol})
            </Heading>
          
          <Stack direction={'horizontal'}>
            <Stat label="Members" value={info ? parseFloat(ethers.utils.formatUnits(info?.token?.totalSupply, 18)).toFixed(0) : null} />
            <Stat label="Voting Period" value={formatVotingPeriod(info?.votingPeriod)} />
            {router.asPath === `/daos/${chainId}/${address}` ? null : <Link href={`/daos/${chainId}/${address}/`}>
              <Button size="small" variant="transparent"><IconArrowRight /></Button>
            </Link>}
          </Stack>
        </Stack>
        </Link>
      )}
    </Card>
  )
}

export default Profile
