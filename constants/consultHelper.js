// components
import Tribute from '../components/extensions/Tribute'
import BuyCrowdsale from '../components/extensions/BuyCrowdsale'
import Redemption from '../components/extensions/Redemption'

import logo from '../public/img/logo-minimal.png'

import { MdGroups } from 'react-icons/md'
import { BsPencil } from 'react-icons/bs'
import { GiPayMoney } from 'react-icons/gi'

// populates tiles on desktop view of New Proposal view
export const consultHelper = [
  {
    title: 'LexDAO Clinic',
    description: 'Law students and professionals from around the world',
    component: <Tribute />,
    extension: 'tribute',
    icon: BsPencil,
    link: 'https://kalico.typeform.com/to/FNsxHBKX',
  },
  {
    title: 'US Lawyer',
    description: 'US based lawyers',
    component: <BuyCrowdsale />,
    extension: 'crowdsale',
    icon: MdGroups,
    link: 'https://hanllplaw.cliogrow.com/intake/64151189b551019438e941afbcf00d75',
  },
]
