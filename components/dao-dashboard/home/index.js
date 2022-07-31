import React from 'react'
import Timeline from './timeline/'
import Sidebar from './sidebar'
import { Flex } from '../../../styles/elements'

export default function Dashboard({ proposals }) {
  return (
    <Flex
      css={{
        gap: '10px',

        '@media (max-width: 640px)': {
          flexDirection: 'column-reverse',
        },
      }}
    >
      <Timeline proposals={proposals} />
      <Sidebar />
    </Flex>
  )
}
