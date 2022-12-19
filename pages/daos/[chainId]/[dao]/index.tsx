import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/DAO'
import { Box } from '@kalidao/reality'
import Timeline from '@components/dao-dashboard/timeline'

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
    <Layout title={data ? data.toString() : 'Dashboard'} content="Create or vote on a proposal.">
      <Box
        padding={{
          xs: '2',
          md: '6',
        }}
      >
        <Timeline />
      </Box>
    </Layout>
  )
}

export default DashboardPage
