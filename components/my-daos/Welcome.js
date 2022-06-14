import React from 'react'
import Featured from './Featured'
import NewDao from './NewDao'
import { Flex } from '../../styles/elements'
export default function Welcome() {
  return (
    <Flex
      dir="row"
      gap="md"
      css={{
        position: 'absolute',
        top: '7rem',
        right: '5rem',
        left: '5rem',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <NewDao />
      <Featured />
    </Flex>
  )
}
