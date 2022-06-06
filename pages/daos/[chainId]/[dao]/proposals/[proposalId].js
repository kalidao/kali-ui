import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../../../components/dao-dashboard/layout/'
import { FETCH_PROPOSAL } from '../../../../../graph/'
import ProposalView from '../../../../../components/dao-dashboard/proposal'
import { useGraph } from '../../../../../components/hooks'
import { Spinner } from '../../../../../components/elements/'
import { Button, Flex } from '../../../../../styles/elements'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getProposal } from '../../../../../graph/queries'

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
export default function ProposalPage({ proposal }) {
  const router = useRouter()
  // const proposal = data && data['proposals'][0]

  console.log('proposal data', router.query.dao, router.query.proposalId, proposal)

  return (
    <Layout heading={`Proposal #${proposal?.serial}`}>
      <Flex
        dir="col"
        gap="md"
        css={{
          minWidth: '90vw',
        }}
      >
        <Button
          variant="transparent"
          effect="film"
          css={{
            color: '$gray100',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.2em',
            maxWidth: '5em',
            fontWeight: '500',
          }}
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
          Back
        </Button>
       <ProposalView proposal={proposal} />
      </Flex>
    </Layout>
  )
}
