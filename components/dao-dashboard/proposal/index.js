import React from 'react'
import { Box, Flex, Text } from '../../../styles/elements'
import Tag from '../../../styles/proposal/Tag'
import InfoCard from './InfoCard'
import { validateProposalTag } from './ProposalCard'
import Results from './Results'
import Votes from './Votes'
import Description from "./Description";
import Vote from './Vote'
import Status from './Status'

export default function ProposalView({ proposal }) {
  console.log('proposal', proposal)

  return (
    <Flex dir="col" css={{
        position: 'relative',
        marginRight: '1rem',
        justifyContent: 'center',
        gap: '1rem'
    }}>
        <Text variant="heading">{proposal && <Tag type={proposal["proposalType"]} />}</Text>
        <Status proposal={proposal} />
        <Flex gap="md" css={{
              minWidth: '80vw',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
            <Box css={{
              minWidth: '50vw'
            }}>
            {proposal && <Description description={proposal["description"]} />}
            </Box>
            <Flex dir="col" gap="md">
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
