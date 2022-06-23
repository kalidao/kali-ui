import React, { useState, useEffect } from 'react'
import { Box, Flex, Text } from '../../../../styles/elements'
import Tag from '../../../../styles/proposal/Tag'
import InfoCard from './InfoCard'
import Results from './Results'
import Votes from './Votes'
import Description from './Description'
import Vote from '../vote'
import InfoBar from '../InfoBar'
import Sponsor from '../Sponsor'
import { useAccount } from 'wagmi'
import Cancel from '../Cancel'
import Process from '../Process'
import { willProcess } from '../helpers'
import { useRouter } from 'next/router'

export default function ProposalView({ proposal }) {
  console.log('proposal', proposal)
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data: account } = useAccount()

  return (
    <Flex
      dir="col"
      css={{
        position: 'relative',
        marginRight: '1rem',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <Text variant="heading">{proposal && <Tag type={proposal['proposalType']} />}</Text>
      <InfoBar proposal={proposal} />
      <Flex
        gap="md"
        css={{
          minWidth: '80vw',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box
          css={{
            minWidth: '50vw',
          }}
        >
          {proposal && <Description description={proposal['description']} />}
        </Box>
        <Flex dir="col" gap="md">
          {proposal && <InfoCard start={proposal['votingStarts']} votingPeriod={proposal['dao']['votingPeriod']} />}
          {proposal && <Results votes={proposal['votes']} />}
        </Flex>
      </Flex>
      <Flex
        css={{
          padding: '1rem',
        }}
      >
        <Vote proposal={proposal} />
        {proposal['sponsored'] == false &&
          (account?.address.toLowerCase() === proposal['proposer'] ? (
            <Cancel proposal={proposal} />
          ) : (
            <Sponsor proposal={proposal} />
          ))}
        <Process proposal={proposal} />
      </Flex>
      {proposal && <Votes votes={proposal['votes']} />}
    </Flex>
  )
}
