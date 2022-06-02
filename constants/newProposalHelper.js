// components
import SendShares from '../components/newproposal/SendShares'
import RemoveMember from '../components/newproposal/RemoveMember'
import SendToken from '../components/newproposal/SendToken'
import SendNFT from '../components/newproposal/SendNFT'
import ContractCall from '../components/newproposal/ContractCall'
import GovernanceSettings from '../components/newproposal/GovernanceSettings'
import Extensions from '../components/newproposal/Extensions'
import Escape from '../components/newproposal/Escape'

import {
  IoFlagOutline,
  IoExtensionPuzzleOutline,
  IoTrashOutline,
  IoRibbonOutline,
  IoPeopleOutline,
} from 'react-icons/io'
import { FiSettings, FiSend, FiTrash2 } from 'react-icons/fi'
import { MdOutlineGeneratingTokens, MdGroups } from 'react-icons/md'
import { BiLoaderCircle, BiCoinStack } from 'react-icons/bi'
import { BsPuzzle } from 'react-icons/bs'
import { GiPayMoney } from 'react-icons/gi'
import { GrGroup } from 'react-icons/gr'

// populates tiles on desktop view of New Proposal view
export const newProposalHelper = [
  {
    title: 'Members',
    description: 'mint voting shares',
    component: <SendShares />,
    icon: FiSend,
  },
  {
    title: 'Payments',
    description: 'send assets from treasury',
    component: <SendToken />,
    icon: MdOutlineGeneratingTokens,
  },
  {
    title: 'NFTs',
    description: 'send NFTs from treasury',
    component: <SendNFT />,
    icon: MdOutlineGeneratingTokens,
  },
  {
    title: 'Calls',
    description: 'manage externals like defi',
    component: <ContractCall />,
    icon: BiLoaderCircle,
  },
  {
    title: 'Rules',
    description: 'update governance settings',
    component: <GovernanceSettings />,
    icon: FiSettings,
  },
  {
    title: 'Update Extensions',
    description: 'configure extension apps',
    component: <Extensions />,
    icon: BsPuzzle,
  },
  {
    title: 'Removal',
    description: 'kick member out for security or misconduct',
    component: <RemoveMember />,
    icon: FiTrash2,
  },
]
