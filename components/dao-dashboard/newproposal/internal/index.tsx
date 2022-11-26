import React from 'react'
import { IconTrash } from '@kalidao/reality'

// menu items
import CallContract from './CallContract'
import Escape from './Escape'
import ToggleTransfer from './ToggleTransfer'
import UpdateDocs from './UpdateDocs'
import UpdateQuorum from './UpdateQuorum'
import UpdateVotingPeriod from './UpdateVotingPeriod'
import GovMenu from './GovMenu'
import Back from '@design/proposal/Back'
import { Stack } from '@kalidao/reality'
import { Item } from '../Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function InternalMenu({ setProposal }: Props) {
  return (
    <Stack>
      <Stack>
        <Item onClick={() => setProposal('escape')} icon={<IconTrash />} label="Escape Proposal" />
      </Stack>
      <Back onClick={() => setProposal('menu')} />
    </Stack>
  )
}

export { InternalMenu, CallContract, Escape, ToggleTransfer, UpdateDocs, UpdateQuorum, UpdateVotingPeriod, GovMenu }
