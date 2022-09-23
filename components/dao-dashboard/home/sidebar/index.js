import React from 'react'
import Profile from './Profile'
import { Flex } from '../../../../styles/elements'

export default function Sidebar() {
  return (
    <Flex
      // gap="md"
      dir="col"
      css={{
        position: 'relative',
        paddingTop: '1rem',
      }}
    >
      <Profile />
    </Flex>
  )
}
