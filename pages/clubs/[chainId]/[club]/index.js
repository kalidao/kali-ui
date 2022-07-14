import Layout from '../../../../components/dao-dashboard/layout/'
import { useRouter } from 'next/router'

export default function Club() {
  const router = useRouter()

  return <Layout heading={'ClubName'}></Layout>
}
