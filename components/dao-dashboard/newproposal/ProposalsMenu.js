import React from 'react'
import { Menu } from '../../../styles/proposal/Menu'

export default function ProposalsMenu({ setProposal }) {
  return (
    <Menu>
      <Menu.Item onClick={() => setProposal('membersMenu')}>Members</Menu.Item>
      <Menu.Item onClick={() => setProposal('sendMenu')}>Payments</Menu.Item>
      <Menu.Item onClick={() => setProposal('internalMenu')}>Internal</Menu.Item>
      <Menu.Item onClick={() => setProposal('appsMenu')}>Apps</Menu.Item>
    </Menu>
  )
}
