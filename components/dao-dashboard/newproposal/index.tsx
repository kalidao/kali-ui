import { useState } from 'react'
import ProposalsMenu from './ProposalsMenu'
import { MembersMenu, AddMember, RemoveMember } from './members'
import { SendMenu, SendErc20, SendErc721, SendEth } from './send'
import { CallContract, UpdateVotingPeriod, UpdateDocs, InternalMenu } from './internal'
import { AppsMenu, SetRedemption } from './apps'
import SetSwap from './apps/SetSwap'
import SetDataRoom from './apps/SetDataRoom'
import UpdateSwap from './apps/UpdateSwap'
import RemoveSwap from './apps/RemoveSwap'
import { ToggleTransfer } from './internal/ToggleTransfer'
import { UpdateQuorum } from './internal/UpdateQuorum'

type Props = {
  proposalProp: string
  title: string
  content: { [key: string]: any } | undefined
}

interface Component {
  title: string
  component: React.ReactNode
}

export function NewProposalModal({ proposalProp, content, title }: Props) {
  const [view, setView] = useState(proposalProp)

  const proposals: { [key: string]: Component } = {
    menu: {
      title: '',
      component: <ProposalsMenu setProposal={setView} />,
    },
    membersMenu: {
      title: 'Manage',
      component: <MembersMenu setProposal={setView} />,
    },
    sendMenu: {
      title: 'Send',
      component: <SendMenu setProposal={setView} />,
    },
    internalMenu: {
      title: 'Internal',
      component: <InternalMenu setProposal={setView} />,
    },
    appsMenu: {
      title: 'Apps',
      component: <AppsMenu setProposal={setView} />,
    },
    addMember: {
      title: 'Add Member',
      component: <AddMember setProposal={setView} content={content} title={title} />,
    },
    removeMember: {
      title: 'Remove Member',
      component: <RemoveMember setProposal={setView} content={content} title={title} />,
    },
    eth: {
      title: 'Send ETH',
      component: <SendEth setProposal={setView} content={content} title={title} />,
    },
    erc20: {
      title: 'Send ERC20',
      component: <SendErc20 setProposal={setView} content={content} title={title} />,
    },
    erc721: {
      title: 'Send ERC721',
      component: <SendErc721 setProposal={setView} content={content} title={title} />,
    },
    transferability: {
      title: 'Toggle Transferability',
      component: <ToggleTransfer />,
    },
    votingPeriod: {
      title: 'Update Voting Period',
      component: <UpdateVotingPeriod />,
    },
    quorum: {
      title: 'Update Quorum',
      component: <UpdateQuorum />,
    },
    docs: {
      title: 'Update Documentation',
      component: <UpdateDocs />,
    },
    call: {
      title: 'Interact with External Contracts',
      component: <CallContract setProposal={setView} content={content} title={title} />,
    },
    redemption: {
      title: 'Set Redemption Rules',
      component: <SetRedemption setProposal={setView} title={title} content={content} />,
    },
    swap_add: {
      title: 'Add Swap',
      component: <SetSwap setProposal={setView} title={title} content={content} />,
    },
    record: {
      title: 'Record Off-Chain Activities',
      component: <SetDataRoom setProposal={setView} title={title} content={content} />,
    },
    swap_update: {
      title: 'Update Swap',
      component: <UpdateSwap setProposal={setView} title={title} content={content} />,
    },
    swap_remove: {
      title: 'Remove Swap',
      component: <RemoveSwap setProposal={setView} title={title} content={content} />,
    },
  }

  return <>{view && <div className="w-72">{proposals[view]['component']}</div>}</>
}
