import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/layout'
import { Stack, Box, Button, IconPencil, IconGrid } from '@kalidao/reality'
import UserDAOs from '@components/home/UserDAOs'
import * as styles from '@design/landing.css'

const HomePage: NextPage = () => {
  const router = useRouter()
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
      <Box className={styles.container}>
        <Stack space="12">
          <Box>
            <h1 className={styles.heading}>Form.</h1>
            <h1 className={styles.heading}>Govern.</h1>
            <h1 className={styles.heading}>Organize.</h1>
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
      <UserDAOs />
    </Layout>
  )
}

export default HomePage
