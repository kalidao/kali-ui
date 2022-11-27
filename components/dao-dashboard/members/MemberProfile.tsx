import {
  Card,
  Stack,
  Box,
  Text,
  Tag,
  Heading,
  Avatar,
  IconEth,
  IconTokens,
  IconDocumentsSolid,
  IconSparkles,
} from '@kalidao/reality'
import { Member } from './types'
import { fetcher } from '@utils/fetcher'
import { useQuery } from '@tanstack/react-query'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { useRouter } from 'next/router'
import { truncateAddress } from '@utils/truncateAddress'
import { useEnsName } from 'wagmi'

type ProfileProps = {
  member: Member
  proposals: any
  votes: string
  totalSupply: number
}

export default function MemberProfile({ member, proposals, votes, totalSupply }: ProfileProps) {
  const router = useRouter()
  const { chainId } = router.query
  const { data: ensName } = useEnsName({
    address: member?.address,
  })
  const { data: profile, isLoading } = useQuery(['userProfile', member], () => fetcher(`/api/users/${member?.address}`))

  console.log('profile', profile, isLoading)

  return (
    <Stack direction={'horizontal'} space={'1'} wrap>
      {member && profile && (
        <MemberCard
          title={
            profile?.handle ? (
              <Stack direction={'vertical'} align="center" justify={'center'} space="1">
                <Text weight="bold" size="large">
                  {profile?.name}
                </Text>
                <Tag size="small">{profile?.handle}</Tag>
              </Stack>
            ) : (
              <Text>{ensName ? ensName : truncateAddress(member?.address)}</Text>
            )
          }
          icon={<Avatar src={profile?.picture} size="16" label="profile" />}
          info={
            <Stack>
              <Text size="base">{profile?.bio}</Text>
              <Stack direction={'horizontal'}>
                <a
                  href={getExplorerLink(Number(chainId), ExplorerType.ADDRESS, member?.address)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconEth />
                </a>
              </Stack>
            </Stack>
          }
        />
      )}
      <MemberCard title="Proposals" icon={<IconDocumentsSolid />} info={proposals?.length} />
      <MemberCard title="Votes" icon={<IconSparkles />} info={votes?.length} />
      <MemberCard
        title="Owns"
        icon={<IconTokens />}
        info={`${((Number(member?.shares) / totalSupply) * 100).toFixed(2)}%`}
      />
      {/* <Pie totalSupply={totalSupply} member={member} /> */}
    </Stack>
  )
}

type CardProps = {
  title: React.ReactNode
  icon: React.ReactNode
  info: React.ReactNode
}

const MemberCard = ({ title, icon, info }: CardProps) => {
  return (
    <Box
      minHeight="44"
      minWidth="44"
      padding="6"
      backgroundColor={'backgroundSecondary'}
      display="flex"
      alignItems={'center'}
      justifyContent="center"
      borderRadius="2xLarge"
    >
      <Stack align="center" justify={'center'} space={'2'}>
        <Box color="foreground">{icon}</Box>
        <Text size="extraLarge"> {title} </Text>
        <Text size="extraLarge">{info}</Text>
      </Stack>
    </Box>
  )
}
