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
    <Flex gap="md" dir="col" css={{ width: '100%' }}>
      <Flex
        dir="col"
        gap="md"
        css={{
          color: '$gray12',
          width: '100%',
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
        <Flex
          dir="col"
          gap="md"
          css={{
            '@media (max-width: 640px)': {
              alignItems: 'center',
            },
          }}
        >
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
                width: '100%',
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
