import Layout from '../../../../components/dao-dashboard/layout/'
import { Home } from '../../../../components/dao-dashboard'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { getProposals, getCrowdsale } from '../../../../graph/queries'

import { useGetProposals } from '../../../../graph/queries/getProposals'
import { useGetCrowdsale } from '../../../../graph/queries/getCrowdsale'

export default function DaoHomePage() {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data, isLoading } = useContractRead({
    addressOrName: dao,
    contractInterface: DAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  const useGetProposalsResult = useGetProposals(chainId, dao)
  // console.debug({ useGetProposalsResult })
  const proposals =
    useGetProposalsResult.data?.data?.daos?.[0]?.['proposals'] === undefined
      ? null
      : useGetProposalsResult.data?.data?.daos?.[0]['proposals']
  console.debug('DAO proposals', { proposals })

  const useGetCrowdsaleResult = useGetCrowdsale(chainId, dao)
  const crowdsale =
    useGetCrowdsaleResult.data?.crowdsales?.[0] === undefined ? null : useGetCrowdsaleResult.data?.crowdsales?.[0]

  return (
    <Layout
      heading={isLoading ? 'DAO' : data}
      crowdsale={crowdsale}
      content="Create or vote on a proposal."
      back={true}
    >
      <Home proposals={proposals} />
    </Layout>
  )
}
