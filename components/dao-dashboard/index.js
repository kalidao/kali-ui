import React from 'react'
import { Sidebar } from './home/'
import Proposals from './proposal/post'
import { Flex } from '../../styles/elements'

export function Dashboard({ proposals }) {
  return (
    <Flex
      css={{
        background: '$background',
        position: 'relative',
        justifyContent: 'space-evenly',
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
