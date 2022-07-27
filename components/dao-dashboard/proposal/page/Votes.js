import React from 'react'
import { Flex, Box, Text } from '../../../../styles/elements'
import Info from '../../../../styles/Info'
import VoteCard from './VoteCard'
import { Table, Row, Heading, Data } from '../../../../styles/Table'

export default function Votes({ votes, symbol }) {
  return (
    <Info
      heading={
        <Flex gap="sm" align="separate">
          Votes
          <Flex
            css={{
              background: '$violet2',
              color: '$mauve11',
              height: '25px',
              width: '25px',
              padding: '0.3rem',
              fontSize: '18px',
              border: '1px solid $violet6',
              borderRadius: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Regular',
            }}
          >
            {votes?.length}
          </Flex>
        </Flex>
      }
    >
      <Box
        css={{
          display: 'grid',
          gridTemplateRows: '1fr',
          width: '100%',
          gap: '1rem',
        }}
      >
        <Box
          css={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1fr',
            width: '100%',
            fontFamily: 'Regular',
            fontWeight: '800',
            fontSize: '24px',
          }}
        >
          <Text>Voter</Text>
          <Text>{symbol}</Text>
          <Text>Vote</Text>
        </Box>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontFamily: 'Regular',
            fontWeight: '800',
          }}
        >
          {votes && votes.map((vote) => <VoteCard key={vote.id} vote={vote} />)}
        </Box>
      </Box>
    </Info>
  )
}
