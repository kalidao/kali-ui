import React from 'react'
import { Box, Button, Flex, Text } from '../../../styles/elements'
import Info from '../../../styles/Info'
import VoteCard from './VoteCard'

export default function Votes({ votes }) {
  console.log('votes', votes)
  return (
    <Info
      heading={
        <Flex gap="sm" align="separate">
          Votes
          <Flex
            css={{
              background: 'hsla(120, 100%, 90%, 0.7)',
              height: '25px',
              width: '25px',
              padding: '0.3rem',
              fontSize: '20px',
              borderRadius: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Screen',
            }}
          >
            {votes?.length}
          </Flex>
        </Flex>
      }
    >
      <Flex gap="sm" dir="col">
        {votes && votes.map((vote) => <VoteCard key={vote.id} vote={vote} />)}
      </Flex>
    </Info>
  )
}
