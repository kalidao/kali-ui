import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import Info from '../../../styles/Info'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import Status from "./Status";

export default function Results({ votes }) {
  const yesVotes = votes.filter((vote) => vote['vote'] === true)
  console.log('yesVotes', yesVotes)
  const status = "PASSING"
  return (
    <Info heading={<Status />}>
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
