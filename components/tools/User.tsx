import { truncateAddress } from '@utils/truncateAddress'
import { Avatar, Stack, Text } from '@kalidao/reality'
import { useEnsName } from 'wagmi'
import HoverCard from '@design/HoverCard'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'

export const User = ({ address }: { address: string }) => {
  const { data: ensName } = useEnsName({
    address: address,
    chainId: 1,
  })
  const { data: profile, isLoading } = useQuery(['userProfile', address], () => fetcher(`/api/users/${address}`))

  return (
    <HoverCard
      link={`/users/${address}`}
      trigger={
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Avatar size="9" src={profile?.picture} address={address} label={`${address} picture`} />
          <Text>{profile?.handle ? profile?.handle : ensName ? ensName : truncateAddress(address)}</Text>
        </Stack>
      }
    >
      <Stack direction={'horizontal'}>
        <Avatar src={profile?.picture} label="user profile picture"></Avatar>
        <Stack>
          <Text weight="semiBold">
            {profile?.handle ? profile?.handle : ensName ? ensName : truncateAddress(address)}
          </Text>
          <Text>{profile?.bio}</Text>
        </Stack>
      </Stack>
    </HoverCard>
  )
}
