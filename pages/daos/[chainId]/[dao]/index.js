import Layout from '../../../../components/dao-dashboard/layout/'
import { Dashboard } from '../../../../components/dao-dashboard'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { getProposals } from '../../../../graph/queries'

export const getServerSideProps = async (context) => {
  const address = context.params.dao
  const chainId = context.params.chainId
  const result = await getProposals(chainId, address)

  return {
    props: {
      proposals: result?.data?.daos[0]['proposals'],
    },
  }
}

export default function Dao({ proposals }) {
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

  console.log('name', data)
  console.log('server proposals', proposals)
  return (
    <Layout heading={isLoading ? null : data}>
      <Dashboard proposals={proposals} />
    </Layout>
  )
}
