import Layout from '../components/layout'
import MyDAOs from '../components/my-daos'
import NewDaoSquare from '../components/my-daos/NewDaoSquare'
import { useNetwork, useAccount } from 'wagmi'
import { USER_DAOS } from '../graph'
import { Text } from '../styles/elements'
import { useGraph } from '../components/hooks/useGraph'

export default function Home() {
  return (
    <Layout heading="DAOs">
      <MyDAOs />
      <NewDaoSquare />
    </Layout>
  )
}
