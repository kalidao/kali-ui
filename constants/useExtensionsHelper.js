// components
import Tribute from "../components/extensions/Tribute";
import BuyCrowdsale from "../components/extensions/BuyCrowdsale";
import Redemption from "../components/extensions/Redemption";

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
];
