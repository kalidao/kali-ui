import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Layout from '@components/layout'
import { useRouter } from 'next/router'
import { useNetwork } from 'wagmi'
import { Box, Button, IconArrowLeft, Skeleton, IconRefresh, Stack } from '@kalidao/reality'
import DaoCard from '@components/home/DaoCard'
import Search from '@components/home/Search'
import { useGetAllDaos } from '@graph/queries/getAllDaos'

const ExplorePage: NextPage = () => {
  const router = useRouter()
  const { data: daos, isLoading, isSuccess, refetch } = useGetAllDaos()
  const [display, setDisplay] = useState<any[]>([])

  useEffect(() => {
    if (isSuccess) {
      if (daos) {
        setDisplay(daos as any[])
      }
    }
  }, [daos, isSuccess])

  useEffect(() => {
    router.prefetch('/')
  })

  useEffect(() => {
    router.prefetch('/create')
  })

  const reset = () => {
    refetch()
    setDisplay(daos as any[])
  }

  return (
    <Layout heading={'Explore'} content="Create a Kali DAO.">
      <Box
        position="relative"
        top="10"
        display="flex"
        flexDirection="column"
        gap="3"
        marginLeft={{
          md: '7',
          lg: '16',
        }}
        marginRight={{
          md: '7',
          lg: '16',
        }}
      >
        <Stack direction={'horizontal'} align="center" justify={'space-between'}>
          <Button variant="transparent" shape="circle" as="a" href="/">
            <IconArrowLeft />
          </Button>
          <Stack direction={'horizontal'} align="center">
            <Search daos={daos as any[]} setDisplay={setDisplay} />
            <Button shape="circle" size="small" variant="secondary" onClick={reset}>
              <IconRefresh />
            </Button>
          </Stack>
        </Stack>

        <Skeleton loading={isLoading}>
          <Stack direction="horizontal" align="center" justify={'space-between'} wrap>
            {display &&
              display.map((dao: { [x: string]: any }) => <DaoCard key={dao['id']} dao={dao} chain={dao.chainId} />)}
          </Stack>
        </Skeleton>
      </Box>
    </Layout>
  )
}

export default ExplorePage
