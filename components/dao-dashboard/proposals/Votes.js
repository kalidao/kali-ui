import React from 'react'
import { Box, Flex, Text } from '../../../styles/elements'

const VoteCard = ({ vote }) => {
  return <Flex gap="md" css={{
    
  }}>
    <Text>{vote.voter}</Text>
    <Text>{vote.vote === true ? "YES" : "NO"}</Text>
  </Flex>
};

export default function Votes({ votes }) {
  console.log('votes', votes)
  return (
    <Flex gap="md" dir="col">
      <Text variant="heading">Votes</Text>
      <Flex gap="sm" dir="col">
        {votes && votes.map(vote => <VoteCard key={vote.id} vote={vote} />)}
      </Flex>
    </Flex>
  )
}
