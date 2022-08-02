import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex } from '../../../../styles/elements'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiUserVoice } from 'react-icons/bi'
import { MdHowToVote } from 'react-icons/md'
import { HiOutlineDocumentAdd } from 'react-icons/hi'

// menu items
import CallContract from './CallContract'
import ConfigureExtensions from './ConfigureExtensions'
import Escape from './Escape'
import ToggleTransfer from './ToggleTransfer'
import UpdateDocs from './UpdateDocs'
import UpdateQuorum from './UpdateQuorum'
import UpdateVotingPeriod from './UpdateVotingPeriod'
import GovMenu from './GovMenu'
import Back from '../../../../styles/proposal/Back'
import { ShuffleIcon } from '@radix-ui/react-icons'

function InternalMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        {/* <Menu.Item onClick={() => setProposal('manager')}>Assign Manager</Menu.Item> */}
        <Menu.Item onClick={() => setProposal('docs')}>
          <HiOutlineDocumentAdd />
          Documents
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('escape')}>
          <AiOutlineDelete />
          Escape Proposal
        </Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('call')}>Call Contract</Menu.Item> */}
        <Menu.Item onClick={() => setProposal('transferability')}>
          <ShuffleIcon />
          Transferability
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('votingPeriod')}>
          <MdHowToVote />
          Voting Period
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('quorum')}>
          <BiUserVoice />
          Participation
        </Menu.Item>
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export {
  InternalMenu,
  CallContract,
  ConfigureExtensions,
  Escape,
  ToggleTransfer,
  UpdateDocs,
  UpdateQuorum,
  UpdateVotingPeriod,
  GovMenu,
}
