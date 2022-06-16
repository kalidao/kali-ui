import React from 'react'
import Profile from './Profile'
import Highlight from './Highlight'
import { Flex } from '../../../../styles/elements'

export default function Sidebar() {
  return (
    <Flex
      gap="md"
      dir="col"
      css={{
        '@media (max-width: 640px)': {
          display: 'none',
        },
      }}
    >
      <Profile />
      <Highlight />
    </Flex>
  )
}
