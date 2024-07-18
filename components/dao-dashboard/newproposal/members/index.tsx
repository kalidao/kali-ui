import React from 'react'
import { UserPlus, UserMinus } from 'lucide-react'
import { Button } from '@components/ui/button'
import AddMember from './AddMember'
import RemoveMember from './RemoveMember'
import Redeem from './Redeem'
import { Back } from '@components/ui/back'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function MembersMenu({ setProposal }: Props) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          className="flex items-center justify-start space-x-2"
          onClick={() => setProposal('addMember')}
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Member</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-start space-x-2"
          onClick={() => setProposal('removeMember')}
        >
          <UserMinus className="h-4 w-4" />
          <span>Remove Member</span>
        </Button>
      </div>
      <Back onClick={() => setProposal('menu')} />
    </div>
  )
}

export { MembersMenu, AddMember, RemoveMember, Redeem }
