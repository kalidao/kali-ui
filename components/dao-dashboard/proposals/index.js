import React from 'react'
import { useRouter } from 'next/router';
import { Flex, Text } from '../../../styles/elements'
import { ProposalCard } from './ProposalCard'
import { getDaoChain } from '../../../utils';
import { DAO_PROPOSALS } from '../../../graph/';
import { useQuery } from '@apollo/client';

export default function Proposals({ dao }) {
  const router = useRouter();
  const daoAddress = router.query.dao
  const daoChain = getDaoChain(daoAddress)
  const { loading, error, data } = useQuery(DAO_PROPOSALS, {
    variables: { dao: daoAddress },
    // client: new ApolloClient({
    //   uri: GRAPH_URL[daoChain],
    //   cache: new InMemoryCache()
    // })
  });

  const proposals = data && data["daos"][0]["proposals"].sort((a, b) => b["creationTime"] - a["creationTime"])
  console.log(proposals)
  
  // TODO:
  // - Binding proposals
  // - Non-binding proposals
  
  return (
    <Flex dir="col" gap="md">
      <Text color="foreground" variant="heading">Proposals</Text>
      <Flex dir="col" gap="md">
      {proposals && proposals.map(proposal => <ProposalCard key={proposal["id"]} proposal={proposal} />)}
      </Flex>
    </Flex>
  )
}
