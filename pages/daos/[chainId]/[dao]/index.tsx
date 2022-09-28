import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import { Home } from '@components/dao-dashboard'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'
import { Box } from '@kalidao/reality'

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
      <Box minHeight="96" width="320">
        <Home />
      </Box>
    </Layout>
  )
}

export default DashboardPage
