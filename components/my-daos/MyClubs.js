import React from 'react'
import { Flex, Text } from '../../styles/elements'
import { ResultsText } from './index';
import NewClub from './NewClub'

export default function MyClubs() {
  return (
    <Flex dir="col" css={{ gap: '1rem', position: 'absolute', left: '8rem', bottom: '5rem', margin: '1rem'}}>
      <ResultsText>You are in 0 Clubs</ResultsText>
      <NewClub />
    </Flex>
  )
}
