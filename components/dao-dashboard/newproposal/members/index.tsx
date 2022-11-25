import React from 'react'
import { Stack } from '@kalidao/reality'
import { IconUserSolid } from '@kalidao/reality'
// menu items
import AddMember from './AddMember'
import RemoveMember from './RemoveMember'
import Redeem from './Redeem'
import Back from '@design/proposal/Back'
import { Item } from '../Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function MembersMenu({ setProposal }: Props) {
  return (
    <Stack>
      <Stack>
        <Item onClick={() => setProposal('addMember')} icon={<IconUserSolid />} label="Add Member" />
        <Item onClick={() => setProposal('removeMember')} icon={<IconUserSolid />} label="Remove Member" />
      </Stack>
      <Back onClick={() => setProposal('menu')} />
    </Stack>
  )
}

export { MembersMenu, AddMember, RemoveMember, Redeem }
