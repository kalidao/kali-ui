import { useState } from 'react'
import { Box } from '@kalidao/reality'
import ProposalsMenu from './ProposalsMenu'
import { MembersMenu, AddMember, RemoveMember, ManageMembership, Redeem } from './members'
import { SendMenu, SendErc20, SendErc721, SendEth } from './send'
import {
  CallContract,
  ConfigureExtensions,
  ToggleTransfer,
  UpdateQuorum,
  UpdateVotingPeriod,
  UpdateDocs,
  Escape,
  InternalMenu,
} from './internal'
import { AppsMenu, SetCrowdsale, SetRedemption, Tribute } from './apps'
import { AssetMenu } from './mint'
import MintReal from './mint/MintReal'
import UpdateCrowdsale from './apps/UpdateCrowdsale'
import RemoveCrowdsale from './apps/RemoveCrowdsale'

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
    mintMenu: {
      title: 'Mint',
      component: <AssetMenu setProposal={setView} />,
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
    addMemberWithVesting: {
      title: 'Add Member with Vesting',
      component: <ManageMembership setProposal={setView} content={content} title={title} />,
    },
    quit: {
      title: 'Redeem and Quit',
      component: <Redeem setProposal={setView} content={content} title={title} />,
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
      component: <ToggleTransfer setProposal={setView} content={content} title={title} />,
    },
    votingPeriod: {
      title: 'Update Voting Period',
      component: <UpdateVotingPeriod setProposal={setView} content={content} title={title} />,
    },
    quorum: {
      title: 'Update Quorum',
      component: <UpdateQuorum setProposal={setView} content={content} title={title} />,
    },
    // Create Asset Menu
    // FIXME: Commenting out till fixed
    // art: {
    //   title: 'Mint Art NFT',
    //   component: <MintArt setProposal={setView} />,
    // },
    real: {
      title: 'Mint real estate NFT',
      component: <MintReal setProposal={setView} content={content} title={title} />,
    },
    manager: {
      title: 'Configure Extensions',
      component: <ConfigureExtensions setProposal={setView} content={content} title={title} />,
    },
    docs: {
      title: 'Update Documentation',
      component: <UpdateDocs setProposal={setView} content={content} title={title} />,
    },
    escape: {
      title: 'Kill a Proposal',
      component: <Escape setProposal={setView} content={content} title={title} />,
    },
    call: {
      title: 'Interact with External Contracts',
      component: <CallContract setProposal={setView} content={content} title={title} />,
    },
    // crowdsale: {
    //   title: 'Set Crowdsale Rules',
    //   component: <SetCrowdsale setProposal={setView} content={content} title={title} />,
    // },
    crowdsale_add: {
      title: 'Set Crowdsale Rules',
      component: <SetCrowdsale setProposal={setView} content={content} title={title} />,
    },
    crowdsale_update: {
      title: 'Update Crowdsale Rules',
      component: <UpdateCrowdsale setProposal={setView} content={content} title={title} />,
    },
    crowdsale_remove: {
      title: 'Remove Crowdsale Rules',
      component: <RemoveCrowdsale setProposal={setView} content={content} title={title} />,
    },
    redemption: {
      // TODO: need to add token approval/allowance logic at submission (added by proposal)
      title: 'Set Redemption Rules',
      component: <SetRedemption setProposal={setView} content={content} title={title} />,
    },
    crowdsaleWithVesting: {
      title: 'Crowdsale with Vesting',
      component: <SetCrowdsale setProposal={setView} content={content} title={title} />,
    },
    tributeWithVesting: {
      title: 'Tribute with Vesting',
      component: <SetCrowdsale setProposal={setView} content={content} title={title} />,
    },
    tribute: {
      title: 'Tribute',
      component: <Tribute setProposal={setView} content={content} title={title} />,
    },
  }

  return <>{view && <Box width="2/3">{proposals[view]['component']}</Box>}</>
}
