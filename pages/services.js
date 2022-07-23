import Layout from '../components/layout'
import { Box, Button } from '../styles/elements'
import Services from '../components/services'
import NewDaoSquare from '../components/home/NewDaoSquare'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function ServicesPage() {
  return (
    <Layout heading="Recommended Service Providers">
      <Box
        css={{
          position: 'absolute',
          top: '5rem',
          padding: '0.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}
      >
        <Button variant="back" ><ArrowLeftIcon />Back</Button>
        <Services />
      </Box>
      <NewDaoSquare />
    </Layout>
  )
}
