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

import { IoFlagOutline, IoExtensionPuzzleOutline, IoTrashOutline, IoRibbonOutline, IoPeopleOutline } from "react-icons/io";
import { FiSettings, FiSend, FiTrash2 } from "react-icons/fi";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { BiLoaderCircle, BiCoinStack } from "react-icons/bi";
import { BsPuzzle } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";

// populates tiles on desktop view of New Proposal view
export const newProposalHelper = [
  {
    title: "Mint Shares",
    description: "update members and cap table",
    component: <SendShares />,
    extension: null,
    icon: FiSend
  },
  {
    title: "Send Assets",
    description: "pay treasury tokens and ETH",
    component: <SendToken />,
    extension: null,
    icon: MdOutlineGeneratingTokens
  },
  {
    title: "Call Contracts",
    description: "manage externals like DeFi",
    component: <ContractCall />,
    extension: null,
    icon: BiLoaderCircle
  },
  {
    title: "Update Rules",
    description: "adjust governance settings",
    component: <GovernanceSettings />,
    extension: null,
    icon: FiSettings
  },
  {
    title: "Update Extensions",
    description: "configure extension apps",
    component: <Extensions />,
    extension: null,
    icon: BsPuzzle
  },
  {
    title: "Remove Members",
    description: "kick for misconduct or security",
    component: <RemoveMember />,
    extension: null,
    icon: FiTrash2
  },
  {
    title: "Make Tribute",
    description: "escrow tribute for membership",
    component: <Tribute />,
    extension: "tribute",
    icon: GiPayMoney
  },
  {
    title: "Purchase Shares",
    description: "join membership by crowdsale",
    component: <BuyCrowdsale />,
    extension: "crowdsale",
    icon: IoPeopleOutline
  },
  {
    title: "Redeem Shares",
    description: "burn shares for treasury assets",
    component: <Redemption />,
    extension: "redemption",
    icon: BiCoinStack
  },
];
