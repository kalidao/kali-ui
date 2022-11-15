import { Avatar, Text, Card, Heading, Spinner, Stack, Button, IconArrowRight, IconBookOpen } from '@kalidao/reality'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEnsAvatar, useEnsName, useQuery } from 'wagmi'
import { getMembers } from '@graph/queries'
import { truncateAddress } from '@utils/truncateAddress'
import { formatEther } from 'ethers/lib/utils'

const Members = () => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data, isLoading, isError, error } = useQuery(
    ['daoProfileMembers', chainId, dao],
    () => getMembers(chainId, dao),
    {
      enabled: !!chainId && !!dao,
    },
  )
  const info = data?.data?.daos?.[0]

  if (isLoading) return <Spinner />

  console.log('members', info)
  return (
    <Card padding="6">
      {isLoading ? (
        <Spinner />
      ) : (
        <Stack>
          <Heading>Members ({info?.members?.length})</Heading>
          {info?.members?.slice(0, 3)?.map((member: any) => (
            <Member key={member?.address} address={member?.address} shares={member?.shares} />
          ))}
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
        </Stack>
      )}
    </Card>
  )
}

const Member = ({ address, shares }: { address: string; shares: string }) => {
  const { data: ensName } = useEnsName({
    address: address,
  })
  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
  })
  return (
    <Stack direction={'horizontal'} align="center">
      <Avatar
        src={ensAvatar ? ensAvatar : ''}
        placeholder={ensAvatar ? false : true}
        address={address}
        label={`${address} picture`}
      />
      <Text>{ensName ? ensName : truncateAddress(address)}</Text>
      <Text>{formatEther(shares)}</Text>
    </Stack>
  )
}

export default Members
