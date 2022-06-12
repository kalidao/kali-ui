import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Button, Flex } from '../../../../styles/elements'
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai'
// menu items
import AddMember from './AddMember'
import RemoveMember from './RemoveMember'
import ManageMembership from './ManageMembership'
import Redeem from './Redeem'
import Back from '../../../../styles/proposal/Back'

function MembersMenu({ setProposal }) {
  return (
    <Flex dir="col" gap="md">
      <Menu>
        <Menu.Item onClick={() => setProposal('addMember')}>
          <AiOutlineUserAdd /> Add Member
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('removeMember')}>
          <AiOutlineUserDelete /> Remove Member
        </Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('addMemberWithVesting')}>Add Member with Vesting</Menu.Item> */}
        {/* <Menu.Item onClick={() => setProposal('quit')}>Quit</Menu.Item> */}
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export { MembersMenu, AddMember, RemoveMember, ManageMembership, Redeem }
