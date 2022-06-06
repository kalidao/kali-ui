import Layout from '../components/layout'
import globalStyles from '../styles/globalStyles'
import MyDAOs from '../components/my-daos'
import NewDaoSquare from '../components/my-daos/NewDaoSquare'
import { useNetwork, useAccount } from 'wagmi'
import { GRAPH_URL, USER_DAOS } from '../graph'
import { request } from 'graphql-request'
import { useState, useEffect } from 'react'
import { Text } from '../styles/elements'
import { useGraph } from '../components/hooks/useGraph'

export default function Home() {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: account?.address,
  })
  const daos = data?.['members']

  return (
    <Layout heading="DAOs">
      {isLoading && <Text color="foreground" css={{
        marginTop: '6rem',
        marginLeft: '5rem',
      }}>Please connect to view your active DAOs.</Text>}
      {daos && <MyDAOs daos={daos} />}
      <NewDaoSquare />
    </Layout>
  )
}
