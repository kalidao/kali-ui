import { Icon } from "@chakra-ui/react";

import { HiUserGroup } from "react-icons/hi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsTools } from "react-icons/bs";

export const presets = [
  {
    type: "Social",
    icon: HiUserGroup,
    voting: 259200,
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
    voting: 432000,
    quorum: 30,
    supermajority: 75,
    paused: 1,
    extensions: {
      crowdsale: {
        description:
          "10 shares per ETH. Limit 1000 shares. Sale ends in 30 days.",
        purchaseToken: "0x0000000000000000000000000000000000000000",
        purchaseMultiplier: 10,
        purchaseLimit: "10000000000000000000", // 10 shares - string, to avoid BigNumber errors
        saleGoal: "1000000000000000000000", // 1000 shares - string, to avoid BigNumber errors
        saleEnds: 2592000, // 30 days from today
        listId: 0, // CHANGE THIS FOR LIVE DEPLOYMENT! THIS MEANS "OPEN" RIGHT NOW
      },
      redemption: {
        description:
          "Members can ragequit for share of treasury. Option starts in 30 days.",
        redemptionStart: 2592000, // 30 days from today
        tokenArray: [
          "0xc778417e063141139fce010982780140aa0cd5ab",
          "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
          "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
          "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02"
        ],
      },
    },
  },
  {
    type: "Services Company",
    icon: BsTools,
    voting: 172800,
    quorum: 20,
    supermajority: 60,
    paused: 1,
    extensions: {
      redemption: {
        description:
          "Members can ragequit for share of treasury. Option starts in 90 days.",
        redemptionStart: 7776000, // 90 days from today
        tokenArray: [
          "0xc778417e063141139fce010982780140aa0cd5ab",
          "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
          "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
          "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02"
        ],
      },
    },
  },
];
