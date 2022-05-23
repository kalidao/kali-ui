import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import { ProposalCard } from './ProposalCard'

export default function Proposals({ dao }) {
  const proposals = dao && dao["proposals"].sort((a, b) => b["creationTime"] - a["creationTime"])
  console.log(proposals)
  return (
    <Flex dir="col" gap="md">
      <Text color="foreground" variant="heading">Activity</Text>
      <Flex dir="col" gap="md">
      {proposals && proposals.map(proposal => <ProposalCard key={proposal["id"]} proposal={proposal} />)}
      </Flex>
    </Flex>
  )
}
