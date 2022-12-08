import Layout from '@components/layout'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { Box, Avatar, Text, Stack, Tag, Card, Divider, IconEth } from '@kalidao/reality'
import { UserDAOs } from '@components/home'
import { useEnsName } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { truncateAddress } from '@utils/truncateAddress'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { AddressZero } from '@ethersproject/constants'

// TODO: Error page is not an address
const UserDAOsPage: NextPage = () => {
  const router = useRouter()
  const user = router.query.user ? router.query.user.toString() : AddressZero
  const { data: ensName } = useEnsName({
    address: user,
    chainId: 1,
  })
  const { data: profile, isLoading } = useQuery(['userProfile', user], () => fetcher(`/api/users/${user}`))

  return (
    <Layout heading={'User'} content={`Learn more about user activity on Kali platform.`}>
      <Box
        style={{
          minHeight: '90vh',
        }}
      >
        <Card padding="6">
          <Stack>
            <Stack direction="horizontal" align="center" justify={'center'}>
              <Avatar size="24" src={profile?.picture} label="Profile"></Avatar>
              <Stack>
                <Text size="extraLarge">
                  {' '}
                  {profile?.handle ? profile?.handle : ensName ? ensName : truncateAddress(user)}
                </Text>
                <Text>{profile?.bio}</Text>
                <Stack align="center" direction={'horizontal'}>
                  {profile?.handle && <Tag>{profile?.handle}</Tag>}
                  {ensName && <Tag>{ensName}</Tag>}
                </Stack>
              </Stack>
            </Stack>
            <Divider />
            <Stack direction={'horizontal'} align="center" justify={'center'}>
              <a href={getExplorerLink(1, ExplorerType.ADDRESS, user)} target="_blank" rel="noopenner noreferrer">
                <IconEth />
              </a>
            </Stack>
          </Stack>
        </Card>
        <Stack direction={'horizontal'}>
          {/* <UserProposals address={user} /> */}
          <UserDAOs address={user} label={ensName ? `${ensName} DAOs` : 'DAOs'} />
        </Stack>
      </Box>
    </Layout>
  )
}

export default UserDAOsPage
