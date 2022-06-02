import { useRouter } from 'next/router'
import Layout from '../../../../components/dao-dashboard/layout/'
import { CROWDSALE } from '../../../../graph/dao-queries'
import Crowdsale from '../../../../components/dao-dashboard/crowdsale/'
import { Spinner } from '../../../../components/elements/'

export default function CrowdsalePage() {
  const router = useRouter()
  const { data, isLoading } = useGraph(router.query.chainId, CROWDSALE, {
    dao: router.query.dao,
  })
  const crowdsale = data && data['crowdsales'][0]
  return <Layout heading="Crowdsale">{isLoading ? <Spinner /> : <Crowdsale crowdsale={crowdsale} />}</Layout>
}
