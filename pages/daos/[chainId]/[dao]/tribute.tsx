import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/KaliDAO.json'
import { Heading, Stack, Box } from '@kalidao/reality'
import Tribute from '@components/dao-dashboard/newproposal/apps/Tribute'

const TributePage: NextPage = () => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data } = useContractRead({
    addressOrName: dao as string,
    contractInterface: DAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  return (
    <Layout title={data ? data.toString() : 'Tribute'} content="Create or vote on a proposal.">
      <Stack>
        <Heading>Work Under Progress</Heading>
        <Box minHeight="96" width="320">
          <Tribute />
        </Box>
      </Stack>
    </Layout>
  )
}

export default TributePage
