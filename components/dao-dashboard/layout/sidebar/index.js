import React from 'react'
import NewProposal from './NewProposal'
import Menu from './Menu'
import { Flex, Box } from '../../../../styles/elements'

export default function Sidebar({ crowdsale }) {
  return (
    <Flex
      css={{
        position: 'sticky',
        padding: '10px',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
      }}
    >
      <Menu saleActive={crowdsale?.active} />
      <NewProposal />
    </Flex>
  )
}
