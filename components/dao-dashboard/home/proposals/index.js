import React from 'react'
import { Flex, Text } from '../../../../styles/elements'
import { ProposalCard } from './ProposalCard'

export default function Proposals({ proposals }) {
  return (
    <Flex dir="col" gap="md">
      <Text color="foreground" variant="heading">
        Proposals
      </Text>
      <Flex dir="col">
        {proposals &&
          (proposals.length > 0
            ? proposals.reverse().map((proposal) => <ProposalCard key={proposal['id']} proposal={proposal} />)
            : 'No proposals. Make one by clicking the + icon.')}
      </Flex>
    </Flex>
  )
}
