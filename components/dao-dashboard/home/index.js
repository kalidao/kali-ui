import React from 'react'
import Timeline from './timeline/'
import Sidebar from './sidebar'
import { Flex } from '../../../styles/elements'

export default function Dashboard({ proposals }) {
  return (
    <Flex
      gap="md"
      css={{
        width: '100%',
        // background: 'blue',

        '@media (max-width: 640px)': {
          flexDirection: 'column-reverse',
          justifyContent: 'center',
        },
      }}
    >
      <Flex
        css={{
          width: '50%',
          // background: 'yellow',

          '@media (max-width: 640px)': {
            width: '100%',
          },
        }}
      >
        <Timeline proposals={proposals} />
      </Flex>
      <Flex
        css={{
          // width: '40%',
          // background: 'red',
          justifyContent: 'center',
        }}
      >
        <Sidebar />
      </Flex>
    </Flex>
  )
}
