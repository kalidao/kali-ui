import React from 'react'
import { Sidebar, Proposals } from './home/'
import { Flex } from '../../styles/elements'

export function Dashboard({ proposals }) {
  return (
    <Flex
      css={{
        background: '$background',
        position: 'relative',
        justifyContent: 'space-between',
        minWidth: '90vw',
        gap: '1rem',
        marginRight: '1rem',
      }}
    >
      <Proposals proposals={proposals} />
      <Sidebar />
    </Flex>
  )
}
