import Layout from '../../../../components/dao-dashboard/layout/'
import { Home } from '../../../../components/dao-dashboard'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { getProposals, getCrowdsale } from '../../../../graph/queries'

export const getServerSideProps = async (context) => {
  const address = context.params.dao
  const chainId = context.params.chainId
  const proposals = await getProposals(chainId, address)
  const crowdsale = await getCrowdsale(chainId, address)

  // crowdsale is undefined if the DAO never had a crowdsale
  return {
    props: {
      proposals:
        proposals?.data?.daos?.[0]?.['proposals'] === undefined ? null : proposals?.data?.daos?.[0]?.['proposals'],
      crowdsale: crowdsale?.data?.crowdsales[0] === undefined ? null : crowdsale?.data?.crowdsales[0],
    },
  }
}

export default function DaoHomePage({ proposals, crowdsale }) {
  const router = useRouter()
  const { data, isLoading } = useContractRead(
    {
      addressOrName: router.query.dao,
      contractInterface: DAO_ABI,
    },
    'name',
    {
      chainId: Number(router.query.chainId),
    },
  )

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
