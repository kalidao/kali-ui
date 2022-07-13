import React from 'react'
import { Flex } from '../../styles/elements'
import ActivityLog from './ActivityLog'
import Featured from './Featured'

export default function Welcome({ allDaos }) {
  return (
    <Flex
      dir="col"
      gap="md"
      css={{
        position: 'absolute',
        top: '7rem',
        right: 0,
        left: 0,
        justifyContent: 'space-evenly',
        alignItems: 'center',

        '@media (max-width: 768px)': {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <ActivityLog allDaos={allDaos && allDaos} />
    </Flex>
  )
}
