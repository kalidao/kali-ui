import { MagicWandIcon } from '@radix-ui/react-icons'
import { MdHowToVote } from 'react-icons/md'
import { Card, Stack, Box, Text, Heading, Avatar, IconEth, IconTokens } from '@kalidao/reality'
import Pie from './Pie'
import { Member } from './types'
import { fetcher } from '@utils/fetcher'
import { useQuery } from '@tanstack/react-query'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { useRouter } from 'next/router'
import { truncateAddress } from '@utils/truncateAddress'

type ProfileProps = {
  member: Member
  proposals: any
  votes: string
  totalSupply: number
}

export default function MemberProfile({ member, proposals, votes, totalSupply }: ProfileProps) {
  const router = useRouter()
  const { chainId } = router.query
  const { data: profile, isLoading } = useQuery(['memberCard', member], () => fetcher(`/api/users/${member?.address}`))

  console.log('profile', profile, isLoading)

  return (
    <Stack direction={'horizontal'} space={'1'}>
      {profile && (
        <MemberCard
          title={profile?.handle ? profile?.handle : truncateAddress(member?.address)}
          icon={<Avatar src={profile?.picture?.original?.url} label="profile" />}
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
      <MemberCard title="Proposals" icon={<MagicWandIcon height={30} width={30} />} info={proposals?.length} />
      <MemberCard title="Votes" icon={<MdHowToVote size={30} />} info={votes?.length} />
      <MemberCard
        title="Owns"
        icon={<IconTokens size={'14'} />}
        info={`${((Number(member?.shares) / totalSupply) * 100).toFixed(2)}%`}
      />
      {/* <Pie totalSupply={totalSupply} member={member} /> */}
    </Stack>
  )
}

type CardProps = {
  title: string
  icon: React.ReactNode
  info: React.ReactNode
}

const MemberCard = ({ title, icon, info }: CardProps) => {
  return (
    <Box minHeight="64" minWidth="64" padding="6" backgroundColor={'backgroundSecondary'} borderRadius="2xLarge">
      <Stack align="center" justify={'center'} space={'2'}>
        <Box color="foreground">{icon}</Box>
        <Heading>{title}</Heading>
        <Text size="headingOne">{info}</Text>
      </Stack>
    </Box>
  )
}
