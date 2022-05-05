import { Icon } from '@chakra-ui/react'

import { HiUserGroup } from 'react-icons/hi'
import { FaMoneyBillAlt, FaHandsHelping } from 'react-icons/fa'
import { BsTools } from 'react-icons/bs'

export const presets = [
  {
    type: 'Social',
    icon: HiUserGroup,
    voting: 3,
    quorum: 10,
    supermajority: 60,
    paused: 0,
    extensions: {
      tribute: {
        description:
          "Launch a community token. Includes 'tribute' extension to request membership in exchange for funds.",
      },
    },
  },
  {
    type: 'Investment Club',
    icon: FaMoneyBillAlt,
    voting: 5,
    quorum: 30,
    supermajority: 75,
    paused: 1,
    extensions: {
      crowdsale: {
        description:
          'Create a fund with your friends. Voting is stricter and slower. Includes month fundraiser, 1 ETH per 10 Shares. Ragequit allowed after.',
        purchaseToken: '0x000000000000000000000000000000000000dEaD',
        purchaseMultiplier: 10,
        purchaseLimit: '1000', // 1000 shares - string, to avoid BigNumber errors
        saleEnds: 30, // 30 days from today
        listId: 1,
      },
      redemption: {
        redemptionStart: 30, // 30 days from today
        tokenArray: null,
      },
    },
  },
  {
    type: 'Company',
    icon: BsTools,
    voting: 2,
    quorum: 20,
    supermajority: 60,
    paused: 1,
    extensions: {
      crowdsale: {
        description: 'Form a digital company and tokenize cap table. Voting is quicker to manage payments.',
      },
    },
  },
  {
    type: 'Nonprofit',
    icon: FaHandsHelping,
    voting: 3,
    quorum: 20,
    supermajority: 60,
    paused: 1,
    extensions: {
      tribute: {
        description: "Includes 'tribute' extension to allow membership in exchange for a donation or membership fee.",
      },
    },
  },
]
