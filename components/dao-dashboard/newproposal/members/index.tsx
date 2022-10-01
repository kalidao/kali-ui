import React from 'react'
import { Menu } from '@design/proposal/Menu'
import { Stack } from '@kalidao/reality'
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai'
// menu items
import AddMember from './AddMember'
import RemoveMember from './RemoveMember'
import Redeem from './Redeem'
import Back from '@design/proposal/Back'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function MembersMenu({ setProposal }: Props) {
  return (
    <Stack>
      <Menu>
        <Menu.Item onClick={() => setProposal('addMember')}>
          <AiOutlineUserAdd /> Add Member
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('removeMember')}>
          <AiOutlineUserDelete /> Remove Member
        </Menu.Item>
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Stack>
  )
}

export { MembersMenu, AddMember, RemoveMember, Redeem }
