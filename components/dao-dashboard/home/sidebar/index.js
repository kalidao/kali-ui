import React from 'react'
import Profile from './Profile'
import { Flex } from '../../../../styles/elements'

export default function Sidebar() {
  return (
    <Flex
      gap="md"
      dir="col"
      css={{
        paddingTop: '20px',
      }}
    >
      <Profile />
    </Flex>
  )
}
