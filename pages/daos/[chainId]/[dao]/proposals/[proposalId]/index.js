import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../../../../../../components/dao-dashboard/layout'
import ProposalView from '../../../../../../components/dao-dashboard/proposal/page'
import { Flex } from '../../../../../../styles/elements'
import { getProposal } from '../../../../../../graph/queries'
import Back from '../../../../../../styles/proposal/Back'

export default function ProposalPage({ proposal }) {
  const router = useRouter()
  const { dao, chainId } = router.query

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}`)
  }, [])

  const goBack = (e) => {
    e.preventDefault()

    router.push(`/daos/${chainId}/${dao}`)
  }

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
        <Back onClick={goBack} />
        <ProposalView proposal={proposal} />
      </Flex>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const address = context.params.dao
  const proposalId = context.params.proposalId
  const chainId = context.params.chainId

  const result = await getProposal(chainId, address, proposalId)

  return {
    props: {
      proposal: result?.data?.proposals[0],
    },
  }
}
