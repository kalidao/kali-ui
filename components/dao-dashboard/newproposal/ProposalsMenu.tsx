import { ExitIcon } from '@radix-ui/react-icons'
import { MdOutlinePayments, MdOutlineManageAccounts, MdDraw } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import React from 'react'
import { Menu } from '@design/proposal/Menu'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProposalsMenu({ setProposal }: Props) {
  return (
    <Menu>
      <Menu.Item onClick={() => setProposal('membersMenu')}>
        <MdOutlineManageAccounts />
        Members
      </Menu.Item>
      <Menu.Item onClick={() => setProposal('sendMenu')}>
        <MdOutlinePayments /> Payments
      </Menu.Item>
      <Menu.Item onClick={() => setProposal('call')}>
        <ExitIcon />
        External Call
      </Menu.Item>
      <Menu.Item onClick={() => setProposal('appsMenu')}>
        <AiOutlineAppstoreAdd /> Apps
      </Menu.Item>
    </Menu>
  )
}
