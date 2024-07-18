import React from 'react'
import { User, Coins, Code, Grid } from 'lucide-react'
import { Item } from './Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProposalsMenu({ setProposal }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <Item onClick={() => setProposal('membersMenu')} label="Member" icon={<User className="w-6 h-6" />} />
      <Item onClick={() => setProposal('sendMenu')} label="Payments" icon={<Coins className="w-6 h-6" />} />
      <Item onClick={() => setProposal('call')} label="External Call" icon={<Code className="w-6 h-6" />} />
      <Item onClick={() => setProposal('appsMenu')} label="Apps" icon={<Grid className="w-6 h-6" />} />
    </div>
  )
}
