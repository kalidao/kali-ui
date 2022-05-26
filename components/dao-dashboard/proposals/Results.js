import React from 'react'
import { Box, Text } from '../../../styles/elements'
export default function Results({ votes}) {
  const yesVotes = votes.filter(vote => vote["vote"] === true)
  console.log('yesVotes', yesVotes)
  return (
    <Box>
        <Text variant="heading">Results</Text> 
        <Text>YES {yesVotes.length}</Text>
        <Text>No {votes.length - yesVotes.length}</Text>
    </Box>
  )
}
