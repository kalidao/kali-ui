import React from 'react'
import Timeline from './timeline/'
import Sidebar from './sidebar'
import { Flex } from '../../../styles/elements'

export default function Dashboard({ proposals }) {
  return (
    <Flex
      gap="lg"
      css={{
        width: '100%',
        // background: 'Green',
        '@media (max-width: 640px)': {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <Flex
        css={{
          width: '100%',
        }}
      >
        <Timeline proposals={proposals} />
      </Flex>
      <Flex
        css={{
          width: '100%',
        }}
      >
        <Sidebar />
      </Flex>
    </Flex>
  )
}
