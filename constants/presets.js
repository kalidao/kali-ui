import { Icon } from "@chakra-ui/react";

import { HiUserGroup } from "react-icons/hi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsTools } from "react-icons/bs";

export const presets = [
  {
    type: "Social",
    icon: HiUserGroup,
    voting: 3,
    quorum: 10,
    supermajority: 60,
    paused: 0,
    extensions: {
      tribute: {
        description: "Anyone can propose to join by paying tribute.",
      },
    },
  },
  {
    type: "Investment Club",
    icon: FaMoneyBillAlt,
    voting: 5,
    quorum: 30,
    supermajority: 75,
    paused: 1,
    extensions: {
      crowdsale: {
        description:
          "10 shares per ETH. Limit 1,000 shares. Sale ends in 30 days.",
        purchaseToken: "0x0000000000000000000000000000000000000000",
        purchaseMultiplier: 10,
        purchaseLimit: "1000000000000000000000", // 1,000 shares - string, to avoid BigNumber errors
        saleEnds: 2592000, // 30 days from today
        listId: 0, // CHANGE THIS FOR LIVE DEPLOYMENT! THIS MEANS "OPEN" RIGHT NOW
      },
      redemption: {
        description:
          "Members can ragequit for share of treasury. Option starts in 30 days.",
        redemptionStart: 2592000, // 30 days from today
        tokenArray: null,
      },
    },
  },
  {
    type: "Company",
    icon: BsTools,
    voting: 2,
    quorum: 20,
    supermajority: 60,
    paused: 1,
    extensions: {},
  },
];
