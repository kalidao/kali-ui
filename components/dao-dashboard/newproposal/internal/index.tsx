import React from 'react'

// menu items
import CallContract from './CallContract'
import Escape from './Escape'
import ToggleTransfer from './ToggleTransfer'
import UpdateDocs from './UpdateDocs'
import UpdateQuorum from './UpdateQuorum'
import UpdateVotingPeriod from './UpdateVotingPeriod'
import GovMenu from './GovMenu'
import { Back } from '@components/ui/back'
import { Item } from '../Item'
import { Trash } from 'lucide-react'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function InternalMenu({ setProposal }: Props) {
  return (
    <div>
      <div>
        <Item onClick={() => setProposal('escape')} icon={<Trash />} label="Escape Proposal" />
      </div>
      <Back onClick={() => setProposal('menu')} />
    </div>
  )
}

export { InternalMenu, CallContract, Escape, ToggleTransfer, UpdateDocs, UpdateQuorum, UpdateVotingPeriod, GovMenu }
