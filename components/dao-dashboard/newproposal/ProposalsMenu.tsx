import { ExitIcon } from '@radix-ui/react-icons'
import { MdOutlinePayments, MdOutlineManageAccounts, MdDraw } from 'react-icons/md'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import React from 'react'
import { Menu } from '@design/proposal/Menu'
import { Stack, Text } from '@kalidao/reality'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProposalsMenu({ setProposal }: Props) {
  return (
    <Stack>
      <Text>Different types of proposals for different needs.</Text>
      <Text>External calls are calls to another smart contract directly. User beware.</Text>
      <Text>Apps are add-ons for KaliDAOs. Check out what's available. </Text>
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
        <Menu.Item onClick={() => setProposal('appsMenu')}>
          <AiOutlineAppstoreAdd /> Apps
        </Menu.Item>
      </Menu>
    </Stack>
  )
}
