import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Text } from '../../../../styles/elements'
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
import Visualizer from './visualizer'
import { useFetch } from '../../../hooks/useFetch'

export default function ProposalView({ proposal }) {
  console.log('proposal', proposal)
  const router = useRouter()
  const { chainId, dao, proposalId } = router.query
  const { data: account } = useAccount()
  const { data: details, isLoading, error } = useFetch(`https://${proposal?.description.slice(7)}.ipfs.dweb.link/`)

  const canProcess = () => {
    const timeLeft =
      new Date().getTime() - new Date(proposal?.dao?.votingPeriod * 1000 + proposal?.votingStarts * 1000).getTime()

    if (proposal?.sponsored === true) {
      if (timeLeft > 0) {
        if (proposal?.status === null) {
          return true
        }
      }
    }
    return false
  }

  console.log('proposal details', details, isLoading, error)
  return (
    <Flex
      dir="col"
      css={{
        position: 'relative',
        marginRight: '1rem',
        justifyContent: 'center',
        gap: '1rem',
        padding: '20px',
        maxWidth: '60vw',
        fontFamily: 'Regular'
      }}
    >
      <Text variant="heading">{`#${proposalId} `} {details && details?.title}</Text>
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
          {proposal && (
            <Description
              description={details ? details?.description : proposal?.description}
              isSchema={details && proposal?.description.slice(0, 7) == "prop://" ? true : false}
            />
          )}
        </Box>
        <Flex dir="col" gap="md">
          {proposal && <InfoCard start={proposal['votingStarts']} votingPeriod={proposal['dao']['votingPeriod']} />}
          {proposal && <Results votes={proposal['votes']} />}
        </Flex>
      </Flex>
      <Visualizer proposal={proposal} />
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
        {canProcess() && (
          <Flex gap="sm">
            <Process proposal={proposal} />
            <Button
              onClick={() =>
                router.push(
                  `/daos/${encodeURIComponent(chainId)}/${encodeURIComponent(dao)}/proposals/${encodeURIComponent(
                    proposalId,
                  )}/delete`,
                )
              }
              css={{
                background: '$red8',
                color: '$gray12',
              }}
            >
              Delete
            </Button>
          </Flex>
        )}
      </Flex>
      {proposal && <Votes votes={proposal['votes']} symbol={proposal?.dao?.token?.symbol} />}
    </Flex>
  )
}
