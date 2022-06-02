import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Text } from '../../../../styles/elements'
import { useGraph } from '../../../hooks'
import { DAO_PROPOSALS } from '../../../../graph'
import { ProposalCard } from '../../proposal/ProposalCard'

export default function Proposals({ proposals }) {
  const router = useRouter()

  return (
    <Flex dir="col" gap="md">
      <Text color="foreground" variant="heading">
        Proposals
      </Text>
      <Flex dir="col">
        {proposals &&
          (proposals.length > 0
            ? proposals.map((proposal) => <ProposalCard key={proposal['id']} proposal={proposal} />)
            : 'No proposals. Make one by clicking the + icon.')}
      </Flex>
    </Flex>
  )
}
