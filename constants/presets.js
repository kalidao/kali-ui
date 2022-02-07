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
        description: "Launch a community token. Voting is permissive. Includes 'tribute' extension to request membership for deposited funds.",
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
          "Create a fund with your friends. Voting is stricter and slower. Includes month fundraiser, 1 ETH per 10 Shares. Ragequit allowed after.",
        purchaseToken: "0x000000000000000000000000000000000000dEaD",
        purchaseMultiplier: 10,
        purchaseLimit: "1000000000000000000000", // 1000 shares - string, to avoid BigNumber errors
        saleEnds: 2592000, // 30 days from today
        listId: 0, // CHANGE THIS FOR LIVE DEPLOYMENT! THIS MEANS "OPEN" RIGHT NOW
      },
      redemption: {
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
    extensions: {
      crowdsale: {
        description:
          "Form a digital company and tokenize cap table. Voting is quicker to manage payments.",
      }
    },
  },
];
