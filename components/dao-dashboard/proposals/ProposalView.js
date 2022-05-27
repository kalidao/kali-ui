import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import Tag from '../../../styles/proposal/Tag'
import InfoCard from './InfoCard'
import { validateProposalTag } from './ProposalCard'
import Results from './Results'
import Votes from './Votes'
import Description from "./Description";
import Vote from './Vote'

export default function ProposalView({ proposal }) {
  console.log('proposal', proposal)

  return (
    <Flex dir="col" css={{
        position: 'relative',
        marginRight: '1rem'
    }}>
        <Text variant="heading">{proposal && <Tag type={proposal["proposalType"]} />}</Text>
        <Flex>
          <Vote proposal={proposal} />
        </Flex>
        <Text>Proposal by {proposal && proposal["proposer"]}</Text>
        <Flex gap="md">
            {proposal && <Description description={proposal["description"]} />}
            <Flex dir="col" gap="md">
                {proposal && <InfoCard start={proposal["creationTime"]} votingPeriod={proposal["dao"]["votingPeriod"]}/>}
                {proposal && <Results votes={proposal["votes"]} />}
            </Flex>
        </Flex>
        {proposal && <Votes votes={proposal["votes"]} />}
    </Flex>
  )
}
