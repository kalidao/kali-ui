// components
import SendShares from "../components/newproposal/SendShares";
import RemoveMember from "../components/newproposal/RemoveMember";
import SendToken from "../components/newproposal/SendToken";
import ContractCall from "../components/newproposal/ContractCall";
import GovernanceSettings from "../components/newproposal/GovernanceSettings";
import Extensions from "../components/newproposal/Extensions";
import Tribute from "../components/newproposal/Tribute";
import BuyCrowdsale from "../components/newproposal/BuyCrowdsale";
import Redemption from "../components/newproposal/Redemption";
import Escape from "../components/newproposal/Escape";

// populates tiles on desktop view of New Proposal view
export const newProposalHelper = [
  {
    title: "Mint Shares",
    description: "update members and cap table",
    component: <SendShares />,
    extension: null,
  },
  {
    title: "Send Assets",
    description: "pay treasury tokens and ETH",
    component: <SendToken />,
    extension: null,
  },
  {
    title: "Call Contracts",
    description: "manage externals like DeFi",
    component: <ContractCall />,
    extension: null,
  },
  {
    title: "Update Rules",
    description: "adjust governance settings",
    component: <GovernanceSettings />,
    extension: null,
  },
  {
    title: "Update Extensions",
    description: "configure extension apps",
    component: <Extensions />,
    extension: null,
  },
  {
    title: "Remove Members",
    description: "kick for misconduct or security",
    component: <RemoveMember />,
    extension: null,
  },
  {
    title: "Make Tribute",
    description: "escrow tribute for membership",
    component: <Tribute />,
    extension: "tribute",
  },
  {
    title: "Purchase Shares",
    description: "join membership by crowdsale",
    component: <BuyCrowdsale />,
    extension: "crowdsale",
  },
  {
    title: "Redeem Shares",
    description: "burn shares for treasury assets",
    component: <Redemption />,
    extension: "redemption",
  },
];
