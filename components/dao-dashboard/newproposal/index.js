import { useState } from "react";
import { Flex, Button, Box } from "../../../styles/elements"
import { DialogTitle } from "../../../styles/Dialog";
import GiveTribute from "./apps/GiveTribute";
import BuyCrowdsale from "./apps/BuyCrowdsale";
import Redeem from "./apps/Redeem";
import SendErc20 from "./SendErc20";
import ManageMembership from "./ManageMembership";
import ConfigureGovernance from "./ConfigureGovernance";
import ConfigureExtensions from "./ConfigureExtensions";
import CallContract from "./CallContract";
import ProposalsMenu from "./ProposalsMenu";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import SendMenu from "./SendMenu";

export function NewProposalModal({ proposalProp }) {
  const [view, setView] = useState(proposalProp);

  const proposals = {
    menu: {
      title: "",
      component: <ProposalsMenu setProposal={setView} />,
    },
    sendMenu: {
      title: "",
      component: <SendMenu setProposal={setView} />,
    },
    giveTribute: {
      title: "Give Tribute",
      component: <GiveTribute />,
    },
    buyCrowdsale: {
      title: "Buy in Crowdsale",
      component: <BuyCrowdsale />,
    },
    quit: {
      title: "Redeem and Quit",
      component: <Redeem />,
    },
    eth: {
      title: "Send ETH",
      component: <SendErc20 />
    },    
    erc20: {
      title: "Send ERC20",
      component: <SendErc20 />
    },
    erc721: {
      title: "Send ERC721",
      component: <SendErc20 />
    },
    mint: {
      title: "Manage Membership",
      component: <ManageMembership />
    },
    governance: {
      title: "Configure Governance",
      component: <ConfigureGovernance />
    },
    apps: {
      title: "Configure Extensions",
      component: <ConfigureExtensions />
    },
    call: {
      title: "Interact with External Contracts",
      component: <CallContract />
    },
    back: {
      title: "",
      component: <ProposalsMenu setProposal={setView} />,
    },
  }

  console.log(view)
  return (
    <>
    {view &&
    <Flex dir="col" gap="md" align="start"> 
      <DialogTitle>{proposals[view]["title"]}</DialogTitle>
      <Box
        css={{
          padding: '1 0 2 0'
        }} 
      >
        {proposals[view]["component"]}
      </Box>
      {view != "menu" && 
      <Button 
        variant="transparent" 
        effect="film"
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.1em',
          maxWidth: '5em'
        }} 
        onClick={() => setView("menu")}>
          <DoubleArrowLeftIcon />
          Back
        </Button>}
    </Flex>}
    </>
  )
}
