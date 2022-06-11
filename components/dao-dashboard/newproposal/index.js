import { useState } from 'react'
import { Flex, Button, Box } from '../../../styles/elements'
import { DialogTitle } from '../../../styles/Dialog'
import ProposalsMenu from './ProposalsMenu'
import { MembersMenu, AddMember, RemoveMember, ManageMembership, Redeem } from './members'
import { SendMenu, SendErc20, SendErc721, SendEth } from './send'
import {
  AdminMenu,
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
      component: <AddMember />,
    },
    removeMember: {
      // done
      title: 'Remove Member',
      component: <RemoveMember />,
    },
    addMemberWithVesting: {
      title: 'Add Member with Vesting',
      component: <ManageMembership />,
    },
    quit: {
      // done
      title: 'Redeem and Quit',
      component: <Redeem />,
    },
    // Send Menu
    eth: {
      // done
      title: 'Send ETH',
      component: <SendEth />,
    },
    erc20: {
      // done
      title: 'Send ERC20',
      component: <SendErc20 />,
    },
    erc721: {
      //done
      title: 'Send ERC721',
      component: <SendErc721 />,
    },
    // Gov Menu
    transferability: {
      // done
      title: 'Toggle Transferability',
      component: <ToggleTransfer />,
    },
    votingPeriod: {
      // done
      title: 'Update Voting Period',
      component: <UpdateVotingPeriod />,
    },
    quorum: {
      // done
      title: 'Update Quorum',
      component: <UpdateQuorum />,
    },
    // Admin Menu
    manager: {
      title: 'Configure Extensions',
      component: <ConfigureExtensions />,
    },
    docs: {
      // done
      title: 'Update Documentation',
      component: <UpdateDocs />,
    },
    escape: {
      // done
      title: 'Kill a Proposal',
      component: <Escape />,
    },
    call: {
      // done
      title: 'Interact with External Contracts',
      component: <CallContract />,
    },
    // Membership Menu
    crowdsale: {
      title: 'Set Crowdsale Rules',
      component: <SetCrowdsale />,
    },
    redemption: {
      // need to add token approval/allowance logic at submission
      title: 'Set Redemption Rules',
      component: <SetRedemption />,
    },
    crowdsaleWithVesting: {
      title: 'Crowdsale with Vesting',
      component: <SetCrowdsale />,
    },
    tributeWithVesting: {
      title: 'Tribute with Vesting',
      component: <SetCrowdsale />,
    },
    tribute: {
      title: 'Tribute',
      component: <Tribute />,
    },
    // Back
    back: {
      title: '',
      component: <ProposalsMenu setProposal={setView} />,
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
