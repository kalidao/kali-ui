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

        '@media (max-width: 640px)': {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <Flex
        css={{
          width: '60%',
        }}
      >
        <Timeline proposals={proposals} />
      </Flex>
      <Flex
        css={
          {
            // width: '100%',
          }
        }
      >
        <Sidebar />
      </Flex>
    </Flex>
  )
}
