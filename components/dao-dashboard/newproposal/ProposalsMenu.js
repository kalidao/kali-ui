import { ExclamationTriangleIcon, ExitIcon, GearIcon } from '@radix-ui/react-icons'
import { MdOutlinePayments, MdOutlineManageAccounts, MdDraw } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import React from 'react'
import { Menu } from '../../../styles/proposal/Menu'
import { Flex, Text } from '../../../styles/elements'

export default function ProposalsMenu({ setProposal }) {
  return (
    <Flex dir="col" gap="md">
      <Text variant="instruction">Different types of proposals for different needs.</Text>
      <Text variant="instruction">External calls are calls to another smart contract directly. User beware.</Text>
      <Text variant="instruction">Apps are add-ons for KaliDAOs. Check out what's available. </Text>
      <Menu>
        <Menu.Item onClick={() => setProposal('membersMenu')}>
          <MdOutlineManageAccounts />
          Members
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('sendMenu')}>
          <MdOutlinePayments /> Payments
        </Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('mintMenu')}>
          <MdDraw />
          Mint
        </Menu.Item> */}
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
    </Flex>
  )
}
