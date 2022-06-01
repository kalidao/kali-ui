import React from 'react'
import { Box, Flex, Text } from '../../../styles/elements'
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
        marginRight: '1rem',
        maxWidth: '90vw',
        justifyContent: 'center',
        // alignItems: 'center'
    }}>
        <Text variant="heading">{proposal && <Tag type={proposal["proposalType"]} />}</Text>
        <Text>Proposal by {proposal && proposal["proposer"]}</Text>
        <Flex gap="md">
            <Box css={{
              minWidth: '50vw'
            }}>
            {proposal && <Description description={proposal["description"]} />}
            </Box>
            <Flex dir="col" gap="md" css={{
             
            }}>
                {proposal && <InfoCard start={proposal["creationTime"]} votingPeriod={proposal["dao"]["votingPeriod"]}/>}
                {proposal && <Results votes={proposal["votes"]} />}
            </Flex>
        </Flex>
        <Flex css={{
          padding: '1rem'
        }}>
          <Vote proposal={proposal} />
        </Flex>
        {proposal && <Votes votes={proposal["votes"]} />}
    </Flex>
  )
}
