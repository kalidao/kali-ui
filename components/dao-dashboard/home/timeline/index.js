import React, { useState, useMemo } from 'react'
import { Flex, Text, Button } from '../../../../styles/elements'
import Card from './Card'
import NewProposalCard from './NewProposalCard'

export default function Timeline({ proposals }) {
  const [show, setShow] = useState(10)
  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () => proposals?.sort((a, b) => b.serial - a.serial).filter((p) => !(p.cancelled == true)),
    [proposals],
  )

  console.log('Timeline', { proposals })

  return (
    <Flex gap="md" dir="col">
      <Flex
        dir="col"
        gap="md"
        css={{
          color: '$gray12',
          borderRight: '1px solid hsla(0, 0%, 90%, 0.1)',
          borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
          boxShadow: 'rgba(0, 0, 0, 0.28) 0px 2px 4px',
          minWidth: '70rem',
          height: 'fit-content',
        }}
      >
        <Text
          color="foreground"
          css={{
            fontFamily: 'Regular',
            padding: '10px 0px 0px 10px',
            fontSize: '24px',
          }}
        >
          Proposals
        </Text>
        <Flex dir="col">
          <NewProposalCard />
          {memoizedProposals?.length > 0 ? (
            <>
              {memoizedProposals.slice(0, show).map((proposal) => (
                <Card key={proposal['id']} proposal={proposal} />
              ))}
              <Flex
                css={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  margin: '1rem',
                }}
              >
                <Button variant="primary" onClick={() => setShow(show + 10)}>
                  Show More
                </Button>
                <Text>
                  Showing {show} of {memoizedProposals.length}
                </Text>
              </Flex>
            </>
          ) : (
            <Flex
              dir="col"
              gap="sm"
              css={{
                padding: '1rem 0.5rem 1rem 0.5rem',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderBottom: '1px solid hsla(0, 0%, 90%, 0.1)',
                borderTop: '1px solid hsla(0, 0%, 90%, 0.1)',
                fontFamily: 'Regular',
              }}
            >
              We couldn't find any proposals for this DAO. Make one now.
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
