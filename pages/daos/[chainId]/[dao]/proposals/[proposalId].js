import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../../../components/dao-dashboard/layout/';
import { FETCH_PROPOSAL } from '../../../../../graph/';
import ProposalView from '../../../../../components/dao-dashboard/proposal';
import { useGraph } from '../../../../../components/hooks';
import { Spinner } from "../../../../../components/elements/"
import { Button, Flex } from '../../../../../styles/elements';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

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
        <Flex dir="col" gap="md" css={{
          minWidth: '90vw'
        }}>
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
            fontWeight: '500'
          }}
          onClick={() => router.back()}
          >
          <ArrowLeftIcon />
          Back
        </Button>
        {isLoading ? <Spinner /> : <ProposalView proposal={proposal} />}
        </Flex>
      </Layout>
  )
}
