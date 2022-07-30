import { Pencil1Icon } from '@radix-ui/react-icons'
import React, { useMemo } from 'react'
import { Flex, Text } from '../../../../styles/elements'
import Card from './Card'

export default function Timeline({ proposals }) {
  // filtering out cancelled proposals
  const memoizedProposals = useMemo(
    () => proposals.sort((a, b) => b.serial - a.serial).filter((p) => !(p.cancelled == true)),
    [proposals],
  )

  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        borderRight: '1px solid hsla(0, 0%, 90%, 0.1)',
        borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
      }}
    >
      <Text
        color="foreground"
        variant="heading"
        css={{
          fontFamily: 'Regular',
          padding: '10px 0px 0px 10px',
        }}
      >
        Proposals
      </Text>
      <Flex dir="col">
        {memoizedProposals.length > 0 ? (
          memoizedProposals.map((proposal) => <Card key={proposal['id']} proposal={proposal} />)
        ) : (
          <Flex gap="sm" align="center">
            <Text
              css={{
                fontFamily: 'Regular',
              }}
            >
              No proposals. Make one by clicking the pencil icon.
            </Text>
            <Pencil1Icon />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
