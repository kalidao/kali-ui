import { useState } from 'react'
import { Flex, Button, Box, Text } from '../../../styles/elements'
import { DialogTitle } from '../../../styles/Dialog'
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
import MintArt from './mint/MintArt'
import MintReal from './mint/MintReal'
import UpdateCrowdsale from './apps/UpdateCrowdsale'
import RemoveCrowdsale from './apps/RemoveCrowdsale'

export function NewProposalModal({ proposalProp, editor, title }) {
  const [view, setView] = useState(proposalProp)

  const proposals = {
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
      component: <AddMember setProposal={setView} editor={editor} title={title} />,
    },
    removeMember: {
      title: 'Remove Member',
      component: <RemoveMember setProposal={setView} editor={editor} title={title} />,
    },
    addMemberWithVesting: {
      title: 'Add Member with Vesting',
      component: <ManageMembership setProposal={setView} editor={editor} title={title} />,
    },
    quit: {
      title: 'Redeem and Quit',
      component: <Redeem setProposal={setView} editor={editor} title={title} />,
    },
    eth: {
      title: 'Send ETH',
      component: <SendEth setProposal={setView} editor={editor} title={title} />,
    },
    erc20: {
      title: 'Send ERC20',
      component: <SendErc20 setProposal={setView} editor={editor} title={title} />,
    },
    erc721: {
      title: 'Send ERC721',
      component: <SendErc721 setProposal={setView} editor={editor} title={title} />,
    },
    transferability: {
      title: 'Toggle Transferability',
      component: <ToggleTransfer setProposal={setView} editor={editor} title={title} />,
    },
    votingPeriod: {
      title: 'Update Voting Period',
      component: <UpdateVotingPeriod setProposal={setView} editor={editor} title={title} />,
    },
    quorum: {
      title: 'Update Quorum',
      component: <UpdateQuorum setProposal={setView} editor={editor} title={title} />,
    },
    // Create Asset Menu
    // FIXME: Commenting out till fixed
    // art: {
    //   title: 'Mint Art NFT',
    //   component: <MintArt setProposal={setView} />,
    // },
    real: {
      title: 'Mint real estate NFT',
      component: <MintReal setProposal={setView} editor={editor} title={title} />,
    },
    manager: {
      title: 'Configure Extensions',
      component: <ConfigureExtensions setProposal={setView} editor={editor} title={title} />,
    },
    docs: {
      title: 'Update Documentation',
      component: <UpdateDocs setProposal={setView} editor={editor} title={title} />,
    },
    escape: {
      title: 'Kill a Proposal',
      component: <Escape setProposal={setView} editor={editor} title={title} />,
    },
    call: {
      title: 'Interact with External Contracts',
      component: <CallContract setProposal={setView} editor={editor} title={title} />,
    },
    crowdsale: {
      title: 'Set Crowdsale Rules',
      component: <SetCrowdsale setProposal={setView} editor={editor} title={title} />,
    },
    crowdsale_add: {
      title: 'Set Crowdsale Rules',
      component: <SetCrowdsale setProposal={setView} editor={editor} title={title} />,
    },
    crowdsale_update: {
      title: 'Set Crowdsale Rules',
      component: <UpdateCrowdsale setProposal={setView} editor={editor} title={title} />,
    },
    crowdsale_remove: {
      title: 'Set Crowdsale Rules',
      component: <RemoveCrowdsale setProposal={setView} editor={editor} title={title} />,
    },
    redemption: {
      // TODO: need to add token approval/allowance logic at submission (added by proposal)
      title: 'Set Redemption Rules',
      component: <SetRedemption setProposal={setView} editor={editor} title={title} />,
    },
    crowdsaleWithVesting: {
      title: 'Crowdsale with Vesting',
      component: <SetCrowdsale setProposal={setView} editor={editor} title={title} />,
    },
    tributeWithVesting: {
      title: 'Tribute with Vesting',
      component: <SetCrowdsale setProposal={setView} editor={editor} title={title} />,
    },
    tribute: {
      title: 'Tribute',
      component: <Tribute setProposal={setView} editor={editor} title={title} />,
    },
  }

  return (
    <>
      {view && (
        <Box
          css={{
            minWidth: '40vw',
            maxWidth: '40vw',
            paddingTop: '5px',
          }}
        >
          {proposals[view]['component']}
        </Box>
      )}
    </>
  )
}
