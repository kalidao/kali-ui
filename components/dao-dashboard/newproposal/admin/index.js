import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex, Button } from '../../../../styles/elements'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
// menu items
import CallContract from './CallContract'
import ConfigureExtensions from './ConfigureExtensions'

function AdminMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('manager')}>Assign Manager</Menu.Item>
        <Menu.Item onClick={() => setProposal('docs')}>Update Docs</Menu.Item>
        <Menu.Item onClick={() => setProposal('escape')}>Escape Proposal</Menu.Item>
        <Menu.Item onClick={() => setProposal('call')}>Call Contract</Menu.Item>
      </Menu>
      <Button variant="back" onClick={() => setProposal('menu')}>
        <DoubleArrowLeftIcon />
        Back
      </Button>
    </Flex>
  )
}

export { AdminMenu, CallContract, ConfigureExtensions }
