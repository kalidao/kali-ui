import Layout from '../components/layout'
import Services from '../components/services'
import { NextPage } from 'next'
import { Back } from '@components/ui/back'
import { useRouter } from 'next/router'

const ServicesPage: NextPage = () => {
  const router = useRouter()
  return (
    <Layout heading="Services" content="Find a service provider for legal, tax, security and other needs.">
      <div className="flex flex-col">
        <Back onClick={() => router.replace('/')} />
        <Services />
      </div>
    </Layout>
  )
}

export default ServicesPage
