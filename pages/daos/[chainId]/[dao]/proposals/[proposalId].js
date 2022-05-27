import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../../../components/dao-dashboard/layout/';
import { FETCH_PROPOSAL } from '../../../../../graph/';
import { useQuery } from '@apollo/client';
import ProposalView from "../../../../../components/dao-dashboard/proposals/ProposalView";

export default function ProposalPage() {
  const router = useRouter()
  // const daoChain = getDaoChain(daoAddress)
  const { loading, error, data } = useQuery(FETCH_PROPOSAL, {
    variables: { 
      dao: router.query.dao,
      serial: router.query.proposalId
    },
  });

  
  console.log('proposal data', router.query.dao, router.query.proposalId, data)
  return (
      <Layout>
        <ProposalView proposal={data && data["proposals"][0] } />
      </Layout>
  )
}
