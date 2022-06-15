import Layout from '../components/layout'
import { Box } from '../styles/elements'
import NewDaoSquare from '../components/my-daos/NewDaoSquare'

export default function ToS() {
  return (
    <Layout heading="Recommended Service Providers">
      <Box
        css={{
          position: 'absolute',
          top: '5rem',
          padding: '0.5rem 1.5rem',
        }}
      ></Box>
      <NewDaoSquare />
    </Layout>
  )
}
