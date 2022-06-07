import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Button, Flex } from '../../../../styles/elements'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
// menu items
import ToggleTransfer from './ToggleTransfer'
import UpdateQuorum from './UpdateQuorum'
import UpdateVotingPeriod from './UpdateVotingPeriod'

function GovMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('transferability')}>Toggle Transferability</Menu.Item>
        <Menu.Item onClick={() => setProposal('votingPeriod')}>Update Voting Period</Menu.Item>
        <Menu.Item onClick={() => setProposal('quorum')}>Update Quorum</Menu.Item>
      </Menu>
      <Button variant="back" onClick={() => setProposal('menu')}>
        <DoubleArrowLeftIcon />
        Back
      </Button>
    </Flex>
  )
}

export { GovMenu, ToggleTransfer, UpdateQuorum, UpdateVotingPeriod }
