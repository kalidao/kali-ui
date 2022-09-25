import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Layout from '@components/layout'
import { useRouter } from 'next/router'
import { useGetDaos } from '@graph/queries/getDaos'
import { useNetwork } from 'wagmi'
import { Box, Button, IconArrowLeft, IconSearch, Input, Skeleton, Stack } from '@kalidao/reality'
import DaoCard from '@components/home/DaoCard'
import Search from '@components/home/Search'
import { useQuery } from '@tanstack/react-query'
import { getBuiltGraphSDK } from '.graphclient'
import { getName } from '@graph/getName'

const sdk = getBuiltGraphSDK()

const ExplorePage: NextPage = () => {
  const router = useRouter()
  const { chain: activeChain } = useNetwork()
  const [chain, setChain] = useState(activeChain ? activeChain.id : 1)
  const { data: daos } = useQuery(['AllDAOs', chain], () =>
    sdk.AllDAOs(
      {},
      {
        chainName: getName(chain),
      },
    ),
  )

  console.table(daos)
  const [display, setDisplay] = useState(daos ? daos?.daos : [])

  useEffect(() => {
    router.prefetch('/')
  })

  useEffect(() => {
    router.prefetch('/create')
  })

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
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Button variant="transparent" shape="circle" as="a" href="/">
            <IconArrowLeft />
          </Button>
          <Search daos={daos} setDisplay={setDisplay} />
        </Box>
        <Skeleton>
          <Stack direction="horizontal" wrap>
            {display &&
              display.map((dao: { [x: string]: any }) => <DaoCard key={dao['id']} dao={dao} chain={chain} />)}
          </Stack>
        </Skeleton>
      </Box>
    </Layout>
  )
}

export default ExplorePage
