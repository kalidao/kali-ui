import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import Info from '../../../styles/Info'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
export default function Results({ votes }) {
  const yesVotes = votes.filter((vote) => vote['vote'] === true)
  console.log('yesVotes', yesVotes)
  return (
    <Info heading="Results">
      <Flex align="separate">
        <CheckIcon color="green" />
        {yesVotes.length}
      </Flex>
      <Flex align="separate">
        <Cross2Icon color="red" />
        {votes.length - yesVotes.length}
      </Flex>
    </Info>
  )
}
