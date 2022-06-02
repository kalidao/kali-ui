import React from 'react'
import { Flex, Text } from '../../../styles/elements'
export default function Status({ proposal }) {
  return (
    <Flex>
      <Text>Proposal by {proposal && proposal['proposer']}</Text>
    </Flex>
  )
}
