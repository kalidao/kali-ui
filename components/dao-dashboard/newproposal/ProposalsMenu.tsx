import { ExitIcon } from '@radix-ui/react-icons'
import { MdOutlinePayments, MdOutlineManageAccounts, MdDraw } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import React from 'react'
import { Stack } from '@kalidao/reality'
import { Item } from './Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProposalsMenu({ setProposal }: Props) {
  return (
    <Stack wrap>
      <Item onClick={() => setProposal('membersMenu')} label="Member" icon={<MdOutlineManageAccounts />} />
      <Item onClick={() => setProposal('sendMenu')} label="Payments" icon={<MdOutlinePayments />} />
      <Item onClick={() => setProposal('call')} label="External Call" icon={<ExitIcon />} />
      <Item onClick={() => setProposal('appsMenu')} label="Apps" icon={<AiOutlineAppstoreAdd />} />
    </Stack>
  )
}
