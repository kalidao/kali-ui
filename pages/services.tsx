import Layout from '../components/layout'
import { Box } from '../styles/elements'
import { Button } from '@kalidao/reality'
import Services from '../components/services'
import { NextPage } from 'next'
import Back from '@design/proposal/Back'
import { useRouter } from 'next/router'

const ServicesPage: NextPage = () => {
  const router = useRouter()
  return (
    <Layout heading="Services" content="Find a service provider for legal, tax, security and other needs.">
      <Box
        css={{
          position: 'absolute',
          top: '5rem',
          padding: '0.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <Back onClick={() => router.replace('/')} />
        <Services />
      </Box>
    </Layout>
  )
}

export default ServicesPage