import React from 'react'
import { TiThumbsDown, TiThumbsUp } from 'react-icons/ti'
import { Flex } from '../../styles/elements'

// create a new component that is passed down vote props for voting with thumbs up or thumbs down and update vote to true or false accordingly
export default function Vote({ text }) {
  const vote = (bool) => {}
  return (
    <Flex gap="sm">
      <TiThumbsUp />
      <TiThumbsDown />
    </Flex>
  )
}
