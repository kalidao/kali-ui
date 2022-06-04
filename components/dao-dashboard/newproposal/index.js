import { useState } from 'react'
import { Flex, Button, Box } from '../../../styles/elements'
import { DialogTitle } from '../../../styles/Dialog'
import Tribute from './apps/Tribute'
import Crowdsale from './apps/Crowdsale'
import Redeem from './Redeem'
import SendErc20 from './SendErc20'
import ManageMembership from './ManageMembership'
import ConfigureGovernance from './ConfigureGovernance'
import ConfigureExtensions from './ConfigureExtensions'
import CallContract from './CallContract'
import ProposalsMenu from './ProposalsMenu'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import SendMenu from './SendMenu'
import SendEth from './SendEth'
import MemberMenu from './MemberMenu'
import GovMenu from './GovMenu'
import AdminMenu from './AdminMenu'
import ApplyMenu from './ApplyMenu'
import AddMember from './AddMember'
import RemoveMember from './RemoveMember'
import SetRedemption from './SetRedemption'
import SendErc721 from './SendErc721'

export function NewProposalModal({ proposalProp }) {
  const [view, setView] = useState(proposalProp)

  const proposals = {
    // Main Menu
    menu: {
      title: '',
      component: <ProposalsMenu setProposal={setView} />,
    },
    // Sub Menu
    memberMenu: {
      title: '',
      component: <MemberMenu setProposal={setView} />,
    },
    sendMenu: {
      title: '',
      component: <SendMenu setProposal={setView} />,
    },
    govMenu: {
      title: '',
      component: <GovMenu setProposal={setView} />,
    },
    adminMenu: {
      title: '',
      component: <AdminMenu setProposal={setView} />,
    },
    applyMenu: {
      title: '',
      component: <ApplyMenu setProposal={setView} />,
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
      title: 'Send ERC721',
      component: <SendErc721 />,
    },
    // Gov Menu
    transferability: {
      title: 'Toggle Transferability',
      component: <Crowdsale />,
    },
    votingPeriod: {
      title: 'Update Voting Period',
      component: <Crowdsale />,
    },
    quorum: {
      title: 'Update Quorum',
      component: <Crowdsale />,
    },
    // Admin Menu
    manager: {
      title: 'Configure Extensions',
      component: <ConfigureExtensions />,
    },
    docs: {
      title: 'Configure Extensions',
      component: <ConfigureExtensions />,
    },
    escape: {
      title: 'Configure Extensions',
      component: <ConfigureExtensions />,
    },
    call: {
      title: 'Interact with External Contracts',
      component: <CallContract />,
    },
    // Membership Menu
    crowdsale: {
      title: 'Set Crowdsale Rules',
      component: <Crowdsale />,
    },
    redemption: {
      title: 'Set Redemption Rules',
      component: <SetRedemption />,
    },
    crowdsaleWithVesting: {
      title: 'Crowdsale with Vesting',
      component: <Crowdsale />,
    },
    tributeWithVesting: {
      title: 'Tribute with Vesting',
      component: <Crowdsale />,
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
          {view != 'menu' && (
            <Button
              variant="transparent"
              effect="film"
              css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.1em',
                maxWidth: '5em',
              }}
              onClick={() => setView('menu')}
            >
              <DoubleArrowLeftIcon />
              Back
            </Button>
          )}
        </Flex>
      )}
    </>
  )
}
