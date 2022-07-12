import React from 'react'
import { Flex } from '../../styles/elements'
import ActivityLog from './ActivityLog'
import Featured from './Featured'

export default function Welcome({ allDaos }) {
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
        flexDirection: 'column',
        alignItems: 'center',
        '@media (max-width: 768px)': {
          flexDirection: 'column-reverse',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <ActivityLog allDaos={allDaos && allDaos} />
      {/* <Featured /> */}
    </Flex>
  )
}
