import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import ProposalView from '@components/dao-dashboard/proposal/page'
import { Flex } from '@design/elements'
import { getProposal } from '../../../../../../graph/queries'
import Back from '@design/proposal/Back'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { dao: address, chainId, proposalId } = context?.params!

  const result = await getProposal(chainId, address, proposalId)

  if (!result?.data) {
    return {
      notFound: true
    }
  } 

  return {
    props: {
      proposal: result?.data?.proposals[0],
    },
  }
}

const ProposalPage: NextPage = ({ proposal }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  console.log('proposal data', router.query.dao, router.query.proposalId, proposal)

  return (
    <Layout heading={`Proposal #${proposal?.serial}`} content="Discuss and vote on the proposal.">
      <Flex
        dir="col"
        gap="md"
        css={{
          height: 'fit-content',
          minWidth: '80vw',
          padding: '20px',
          borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
        }}
      >
        <Back onClick={() => router.back()} />
        <ProposalView proposal={proposal} />
      </Flex>
    </Layout>
  )
}

export default ProposalPage
