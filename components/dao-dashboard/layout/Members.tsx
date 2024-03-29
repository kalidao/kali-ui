import { Text, Box, Card, Heading, Spinner, Stack, Button, Tag, IconBookOpen } from '@kalidao/reality'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from 'wagmi'
import { getMembers } from '@graph/queries'
import { formatEther } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { User } from '@components/tools/User'

const Members = () => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data, isLoading } = useQuery(
    ['daoProfileMembers', chainId, dao],
    () => getMembers(Number(chainId), dao as string),
    {
      enabled: !!chainId && !!dao,
    },
  )
  const info = data?.data?.daos?.[0]

  const list = useMemo(
    () =>
      info?.members
        ?.sort((a: { shares: number }, b: { shares: number }) => b.shares - a.shares)
        .filter((p: { shares: number }) => p.shares > 0),
    [info],
  )

  if (isLoading) return <Spinner />

  return (
    <Card padding="6">
      {isLoading ? (
        <Spinner />
      ) : (
        <Box display="flex" flexDirection={'column'} justifyContent={'space-between'} height="full">
          <Stack>
            <Stack direction={'horizontal'} align="center" justify={'space-between'}>
              <Heading>Members</Heading>
              <Tag size="medium">{list?.length}</Tag>
            </Stack>
            {list?.slice(0, 3)?.map((member: any) => (
              <Member key={member?.address} address={member?.address} shares={member?.shares} />
            ))}
          </Stack>
          <Link
            href={{
              pathname: `/daos/[chainId]/[dao]/members`,
              query: { chainId: chainId, dao: dao },
            }}
            passHref
          >
            <Button as="a" variant="transparent" width={'full'} size="small" prefix={<IconBookOpen />}>
              View All
            </Button>
          </Link>
        </Box>
      )}
    </Card>
  )
}

const Member = ({ address, shares }: { address: string; shares: string }) => {
  return (
    <Stack direction={'horizontal'} align="center" justify={'space-between'}>
      <User address={address} />
      <Text>{Number(formatEther(shares)).toFixed(2)}</Text>
    </Stack>
  )
}

export default Members
