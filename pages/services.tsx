import Layout from '../components/layout'
import { Box, Button } from '@kalidao/reality'
import Services from '../components/services'
import { NextPage } from 'next'
import Back from '@design/proposal/Back'
import { useRouter } from 'next/router'

const ServicesPage: NextPage = () => {
  const router = useRouter()
  return (
    <Layout heading="Services" content="Find a service provider for legal, tax, security and other needs.">
      <Box
        marginY={{
          md: '5',
        }}
        marginX={{
          xs: '2',
          sm: '8',
          md: '12',
          lg: '6',
        }}
      >
        <Back onClick={() => router.replace('/')} />
        <Services />
      </Box>
    </Layout>
  )
}

export default ServicesPage
