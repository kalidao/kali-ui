import { useState } from 'react'
import { Flex, Button, Box } from '../../../styles/elements'
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
import { AppsMenu, SetCrowdsale, SetRedemption, SetProject, Tribute } from './apps'
import { AssetMenu } from './mint'
import MintArt from './mint/MintArt'
import MintReal from './mint/MintReal'

export function NewProposalModal({ proposalProp }) {
  const [view, setView] = useState(proposalProp)

  const proposals = {
    // Main Menu
    menu: {
      title: '',
      component: <ProposalsMenu setProposal={setView} />,
    },
    // Sub Menu
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
    // Member Menu
    addMember: {
      // done
      title: 'Add Member',
      component: <AddMember setProposal={setView} />,
    },
    removeMember: {
      // done
      title: 'Remove Member',
      component: <RemoveMember setProposal={setView} />,
    },
    addMemberWithVesting: {
      title: 'Add Member with Vesting',
      component: <ManageMembership setProposal={setView} />,
    },
    quit: {
      // done
      title: 'Redeem and Quit',
      component: <Redeem setProposal={setView} />,
    },
    // Send Menu
    eth: {
      // done
      title: 'Send ETH',
      component: <SendEth setProposal={setView} />,
    },
    erc20: {
      // done
      title: 'Send ERC20',
      component: <SendErc20 setProposal={setView} />,
    },
    erc721: {
      //donef
      title: 'Send ERC721',
      component: <SendErc721 setProposal={setView} />,
    },
    // Gov Menu
    transferability: {
      // done
      title: 'Toggle Transferability',
      component: <ToggleTransfer setProposal={setView} />,
    },
    votingPeriod: {
      // done
      title: 'Update Voting Period',
      component: <UpdateVotingPeriod setProposal={setView} />,
    },
    quorum: {
      // done
      title: 'Update Quorum',
      component: <UpdateQuorum setProposal={setView} />,
    },
    // Create Asset Menu
    art: {
      title: 'Mint Art NFT',
      component: <MintArt setProposal={setView} />,
    },
    real: {
      title: 'Mint real estate NFT',
      component: <MintReal setProposal={setView} />,
    },
    // Admin Menu
    manager: {
      title: 'Configure Extensions',
      component: <ConfigureExtensions setProposal={setView} />,
    },
    docs: {
      // done
      title: 'Update Documentation',
      component: <UpdateDocs setProposal={setView} />,
    },
    escape: {
      // done
      title: 'Kill a Proposal',
      component: <Escape setProposal={setView} />,
    },
    call: {
      // done
      title: 'Interact with External Contracts',
      component: <CallContract setProposal={setView} />,
    },
    // Membership Menu
    crowdsale: {
      title: 'Set Crowdsale Rules',
      component: <SetCrowdsale setProposal={setView} />,
    },
    redemption: {
      // need to add token approval/allowance logic at submission
      title: 'Set Redemption Rules',
      component: <SetRedemption setProposal={setView} />,
    },
    crowdsaleWithVesting: {
      title: 'Crowdsale with Vesting',
      component: <SetCrowdsale setProposal={setView} />,
    },
    tributeWithVesting: {
      title: 'Tribute with Vesting',
      component: <SetCrowdsale setProposal={setView} />,
    },
    tribute: {
      title: 'Tribute',
      component: <Tribute setProposal={setView} />,
    },
    projectmanagement: {
      title: 'Project Management',
      component: <SetProject setProposal={setView} />,
    },
  }

  return (
    <>
      {view && (
        <Flex dir="col" gap="md" align="start">
          <DialogTitle>{proposals[view]['title']}</DialogTitle>
          <Box
            css={{
              padding: '1 0 2 0',
            }}
          >
            {proposals[view]['component']}
          </Box>
        </Flex>
      )}
    </>
  )
}
