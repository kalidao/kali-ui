import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../../../components/dao-dashboard/layout/';
import { FETCH_PROPOSAL } from '../../../../../graph/';
import ProposalView from "../../../../../components/dao-dashboard/proposals/ProposalView";

export default function ProposalPage() {
  const router = useRouter()
  const { data, isLoading } = useGraph(router.query.chainId, FETCH_PROPOSAL, { 
      dao: router.query.dao,
      serial: router.query.proposalId
    },
  );
  const proposal = data && data["proposals"][0]
  
  console.log('proposal data', router.query.dao, router.query.proposalId, proposal)

  return (
      <Layout>
        <ProposalView proposal={proposal} />
      </Layout>
  )
}
