import React from 'react'
import { Box } from '../../../styles/elements'
import { styled } from '../../../styles/stitches.config'
import { Menu } from '../../../styles/proposal/Menu'

export default function ProposalsMenu({ setProposal }) {
  return (
    <Menu>
      <Menu.Item onClick={() => setProposal('membersMenu')}>Members</Menu.Item>
      <Menu.Item onClick={() => setProposal('sendMenu')}>Send Stuff</Menu.Item>
      <Menu.Item onClick={() => setProposal('govMenu')}>Governance</Menu.Item>
      <Menu.Item onClick={() => setProposal('adminMenu')}>Admin</Menu.Item>
      <Menu.Item onClick={() => setProposal('appsMenu')}>Membership</Menu.Item>
    </Menu>
  )
}
