import React, { useState, useMemo } from 'react'
import { Box, Text, Button, Heading } from '@kalidao/reality'
import Card from './Card'
import NewProposalCard from './NewProposalCard'

export default function Timeline({ proposals }) {
  const [show, setShow] = useState(10)
  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () => proposals?.sort((a, b) => b.serial - a.serial).filter((p) => !(p.cancelled == true)),
    [proposals],
  )

  return (
        <Box  display="flex" flexDirection="column" padding="2" maxWidth="3/4">
          <NewProposalCard />
          {memoizedProposals?.length > 0 ? (
            <>
              {memoizedProposals.slice(0, show).map((proposal) => (
                <Card key={proposal['id']} proposal={proposal} />
              ))}
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Button variant="transparent" size="small" onClick={() => setShow(show + 10)}>
                  Show More
                </Button>
                <Text>
                  Showing {show} of {memoizedProposals.length}
                </Text>
              </Box>
            </>
          ) : (
            <Text>
              We couldn't find any proposals for this DAO. Make one now.
            </Text>
          )}
        </Box>
  )
}
