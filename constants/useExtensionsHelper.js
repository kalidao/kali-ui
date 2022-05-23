// components
import Tribute from "../components/extensions/Tribute";
import BuyCrowdsale from "../components/extensions/BuyCrowdsale";
import Redemption from "../components/extensions/Redemption";
import ShareManager from "../components/extensions/ShareManager";

import { MdGroups } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";

// populates tiles on desktop view of New Proposal view
export const useExtensionsHelper = [
  {
    title: "Make Tribute",
    description: "escrow tribute for membership",
    component: <Tribute />,
    extension: "tribute",
    icon: GiPayMoney
  },
  {
    title: "Purchase DAO Tokens",
    description: "join membership by crowdsale",
    component: <BuyCrowdsale />,
    extension: "crowdsale",
    icon: MdGroups
  },
  {
    title: "Redeem Shares",
    description: "burn shares for treasury assets",
    component: <Redemption />,
    extension: "redemption",
    icon: BiCoinStack
  },
  {
    title: "Allocate DAO Tokens",
    description: "managers do something",
    component: <ShareManager />,
    extension: "shareManager",
    icon: BiCoinStack
  },
];
