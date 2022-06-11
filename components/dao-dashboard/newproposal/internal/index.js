import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex, Button } from '../../../../styles/elements'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
// menu items
import CallContract from './CallContract'
import ConfigureExtensions from './ConfigureExtensions'
import Escape from './Escape'
import ToggleTransfer from './ToggleTransfer'
import UpdateDocs from './UpdateDocs'
import UpdateQuorum from './UpdateQuorum'
import UpdateVotingPeriod from './UpdateVotingPeriod'
import Back from '../../../../styles/proposal/Back'

function InternalMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        {/* <Menu.Item onClick={() => setProposal('manager')}>Assign Manager</Menu.Item> */}
        <Menu.Item onClick={() => setProposal('docs')}>Update Docs</Menu.Item>
        <Menu.Item onClick={() => setProposal('escape')}>Escape Proposal</Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('call')}>Call Contract</Menu.Item> */}
        <Menu.Item onClick={() => setProposal('transferability')}>Toggle Transferability</Menu.Item>
        <Menu.Item onClick={() => setProposal('votingPeriod')}>Update Voting Period</Menu.Item>
        <Menu.Item onClick={() => setProposal('quorum')}>Update Quorum</Menu.Item>
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export {
  InternalMenu,
  CallContract,
  ConfigureExtensions,
  Escape,
  ToggleTransfer,
  UpdateDocs,
  UpdateQuorum,
  UpdateVotingPeriod,
}
