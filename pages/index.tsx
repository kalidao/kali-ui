import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import { Heading, Text, Box, Button } from '@kalidao/reality'
import { useAccount } from 'wagmi'
import { MdCreate, MdExplore } from 'react-icons/md'
import UserDAOs from '@components/home/UserDAOs'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { address: account } = useAccount()

  useEffect(() => {
    router.prefetch('/')
  })

  useEffect(() => {
    router.prefetch('/explore')
  })

  const goTo = (to: string) => {
    if (to === 'explore') {
      router.push('/explore')
    }
    if (to === 'create') {
      router.push('/create')
    }
  }

  return (
    <Layout heading="Home" content="Create or join a Kali DAO.">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="viewHeight" gap="3" width="viewWidth">
        <Heading>
          Form a  DAO. Enjoy true ownership.
        </Heading>
        <Text size={{
          xs: "small",
          sm: "small"
        }}>
          DAOs are a new operating system for organizing online.
        </Text>
        <Text>
          Commit with code and reduce legal spend.
        </Text>
        <Box display="flex" gap="2">
          <Button prefix={<MdCreate />} variant="primary" onClick={() => goTo('create')}>Create</Button>
          <Button prefix={<MdExplore />} variant="secondary" onClick={() => goTo('explore')}>Explore</Button>
        </Box>
      </Box>
      <UserDAOs />
    </Layout>
  )
}

export default HomePage