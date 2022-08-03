import { ExclamationTriangleIcon, ExitIcon, GearIcon } from '@radix-ui/react-icons'
import { MdOutlinePayments, MdOutlineManageAccounts, MdDraw } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import React from 'react'
import { Menu } from '../../../styles/proposal/Menu'

export default function ProposalsMenu({ setProposal }) {
  return (
    <Menu>
      <Menu.Item onClick={() => setProposal('membersMenu')}>
        <MdOutlineManageAccounts />
        Members
      </Menu.Item>
      <Menu.Item onClick={() => setProposal('sendMenu')}>
        <MdOutlinePayments /> Payments
      </Menu.Item>
      <Menu.Item onClick={() => setProposal('mintMenu')}>
        <MdDraw />
        Mint
      </Menu.Item>
      <Menu.Item onClick={() => setProposal('call')}>
        <ExitIcon />
        External Call
      </Menu.Item>
      {/* <Menu.Item onClick={() => setProposal('internalMenu')}>
        <GearIcon />
        Settings
      </Menu.Item> */}
      <Menu.Item onClick={() => setProposal('appsMenu')}>
        <AiOutlineAppstoreAdd /> Apps
      </Menu.Item>
    </Menu>
  )
}
