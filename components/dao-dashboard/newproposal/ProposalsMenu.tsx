import React from 'react'
import { IconCode, IconGridSolid, IconTokens, IconUserSolid, Stack } from '@kalidao/reality'
import { Item } from './Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProposalsMenu({ setProposal }: Props) {
  return (
    <Stack wrap>
      <Item onClick={() => setProposal('membersMenu')} label="Member" icon={<IconUserSolid />} />
      <Item onClick={() => setProposal('sendMenu')} label="Payments" icon={<IconTokens />} />
      <Item onClick={() => setProposal('call')} label="External Call" icon={<IconCode />} />
      <Item onClick={() => setProposal('appsMenu')} label="Apps" icon={<IconGridSolid />} />
    </Stack>
  )
}
