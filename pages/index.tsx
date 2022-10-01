import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import { Heading, Text, Box, Button, IconPencil, IconGrid, IconBookOpen } from '@kalidao/reality'
import { useAccount } from 'wagmi'
import UserDAOs from '@components/home/UserDAOs'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { address: account } = useAccount()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    router.prefetch('/')
  })

  useEffect(() => {
    router.prefetch('/explore')
  })

  const goTo = (to: string) => {
    setLoading(true)
    if (to === 'explore') {
      router.push('/explore')
    }
    if (to === 'create') {
      router.push('/create')
    }
    setLoading(false)
  }

  return (
    <Layout heading="Home" content="Create or join a Kali DAO.">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="viewHeight"
        gap="3"
        width="viewWidth"
      >
        <Heading>Form a DAO. Enjoy true ownership.</Heading>
        <Text
          size={{
            xs: 'small',
            sm: 'small',
          }}
        >
          DAOs are a new operating system for organizing online.
        </Text>
        <Text>Commit with code and reduce legal spend.</Text>
        <Box display="flex" gap="2">
          <Button prefix={<IconPencil />} variant="primary" onClick={() => goTo('create')} loading={loading}>
            Create
          </Button>
          <Button prefix={<IconGrid />} variant="secondary" onClick={() => goTo('explore')}>
            Explore
          </Button>
          <Button prefix={<IconBookOpen />} variant="secondary" as="a" href={"https://www.loom.com/share/76197b675b714316a752c895451381e2"} target="_blank" >
            Tutorial
          </Button>
        </Box>
      </Box>
      <UserDAOs />
    </Layout>
  )
}

export default HomePage
