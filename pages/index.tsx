import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import { Stack, Box, Button, IconPencil, IconGrid } from '@kalidao/reality'
import UserDAOs from '@components/home/UserDAOs'
import * as styles from '@design/landing.css'
import { useAccount, useEnsName } from 'wagmi'

const HomePage: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({
    address,
    enabled: isConnected,
    chainId: 1,
  })
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
      <Box className={styles.container}>
        <Stack space="12">
          <Box>
            <h1 className={styles.heading}>Form a DAO. Enjoy true ownership.</h1>
            {/* <h1 className={styles.heading2}>Create organizations that are forever and always yours 🪄</h1> */}
            {/* <h1 className={styles.heading2}>forever & always yours ❤️</h1> */}
          </Box>
          <Box display="flex" gap="2">
            <Button prefix={<IconPencil />} variant="primary" onClick={() => goTo('create')} loading={loading}>
              Create
            </Button>
            <Button prefix={<IconGrid />} variant="secondary" onClick={() => goTo('explore')}>
              Explore
            </Button>
          </Box>
        </Stack>
      </Box>
      {isConnected && <UserDAOs address={address && (address as string)} />}
    </Layout>
  )
}

export default HomePage
