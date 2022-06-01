import React from 'react'
import { useRouter } from 'next/router';
import { Flex, Text } from '../../../styles/elements'
import { ProposalCard } from './ProposalCard'
import { getDaoChain } from '../../../utils';
import { DAO_PROPOSALS } from '../../../graph/';
import { useGraph } from '../../hooks/';

export default function Proposals() {
  const router = useRouter();
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data, isLoading } = useGraph(daoChain, DAO_PROPOSALS,  { dao: daoAddress });

  const proposals = data ? data["daos"][0]["proposals"] : null
  console.log(proposals)
  
  // TODO:
  // - Binding proposals
  // - Non-binding proposals
  
  return (
    <Flex dir="col" gap="md">
      <Text color="foreground" variant="heading">Proposals</Text>
      <Flex dir="col">
      {proposals && (proposals.length > 0 ?
      proposals.map(proposal => 
        <ProposalCard key={proposal["id"]} proposal={proposal} />
      ) : 'No proposals. Make one by clicking the + icon.')}
      </Flex>
    </Flex>
  )
}
