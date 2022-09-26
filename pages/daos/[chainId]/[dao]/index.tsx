import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import { Home } from '@components/dao-dashboard'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'

const DashboardPage: NextPage = () => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data } = useContractRead({
    addressOrName: dao as string,
    contractInterface: DAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  return (
    <Layout heading={data ? data.toString() : 'Dashboard'} content="Create or vote on a proposal.">
      <Home />
    </Layout>
  )
}

<<<<<<< HEAD
=======
export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = context?.params?.dao
  const chainId = context?.params?.chainId

  console.debug('address chainId', address, chainId)
  const result = await getProposals(chainId, address)

  if (!result?.data?.proposals) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      proposals: result?.data?.proposals,
    },
  }
}

>>>>>>> 8cd1792483f8c6163e232bf55b8b9d855880a3a0
export default DashboardPage
