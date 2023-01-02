import {
  Avatar,
  Box,
  Card,
  Heading,
  Skeleton,
  Spinner,
  Stack,
  Text,
  Button,
  IconArrowRight,
  IconTwitter,
  IconDiscord,
  IconLink,
  Divider,
  IconGitHub,
} from '@kalidao/reality'
import { useRouter } from 'next/router'
import { useQuery } from 'wagmi'
import { getDaoInfo } from '@graph/queries'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { useGetDaoMeta } from '@components/hooks/useGetDaoMeta'

const Profile = ({ address, chainId }: DashboardElementProps) => {
  const router = useRouter()
  const { data, isLoading } = useQuery(['daoProfileInfo', chainId, address], () => getDaoInfo(chainId, address), {
    enabled: !!chainId && !!address,
  })
  const { data: meta } = useGetDaoMeta(chainId, address)
  const info = data?.data?.daos?.[0]

  if (isLoading)
    return (
      <Skeleton>
        <Card padding="6" shadow hover></Card>
      </Skeleton>
    )

  console.log('meta', meta)
  return (
    <Card padding="6" width="full">
      <Stack
        direction={'horizontal'}
        align={router.asPath === `/daos/${chainId}/${address}` ? 'center' : 'flex-start'}
        justify={router.asPath === `/daos/${chainId}/${address}` ? 'center' : 'space-between'}
      >
        <Box width="full" display="flex" alignItems="center" justifyContent={'center'}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Stack align="center" justify={'center'}>
              <Avatar src={meta?.image} label="dao profile pic" address={address as string} size="32" />
              <Heading>
                {info?.token?.name} ({info?.token?.symbol})
              </Heading>
              <Text>{meta?.description}</Text>
              <Divider />
              <Stack direction={'horizontal'}>
                {meta?.socials?.twitter && (
                  <a href={`${meta?.socials?.twitter}`} target="_blank" rel="noreferrer">
                    <IconTwitter size="5" color="foreground" />
                  </a>
                )}
                {meta?.socials?.discord && (
                  <a href={`${meta?.socials?.discord}`} target="_blank" rel="noreferrer">
                    <IconDiscord size="5" color="foreground" />
                  </a>
                )}
                {meta?.socials?.github && (
                  <a href={`${meta?.socials?.github}`} target="_blank" rel="noreferrer">
                    <IconGitHub size="5" color="foreground" />
                  </a>
                )}
                {meta?.socials?.website && (
                  <a href={`${meta?.socials?.website}`} target="_blank" rel="noreferrer">
                    <IconLink size="5" color="foreground" />
                  </a>
                )}
              </Stack>
            </Stack>
          )}
        </Box>
        {router.asPath === `/daos/${chainId}/${address}` ? null : (
          <Link href={`/daos/${chainId}/${address}/`} passHref>
            <Button size="small" as="a" variant="transparent">
              <IconArrowRight />
            </Button>
          </Link>
        )}
      </Stack>
    </Card>
  )
}

export default Profile
