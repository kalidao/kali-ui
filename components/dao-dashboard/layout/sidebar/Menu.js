import React from 'react'
import { Flex, Text } from '../../../../styles/elements'
import Link from 'next/link'
import { styled } from '../../../../styles/stitches.config'
import { bounce } from '../../../../styles/animation'
import { useRouter } from 'next/router'
import { CHECK_APPS } from '../../../../graph'
import { RiInformationFill, RiInformationLine } from 'react-icons/ri'
import {
  BsFillPiggyBankFill,
  BsPiggyBank,
  BsPeople,
  BsFillPeopleFill,
  BsBriefcase,
  BsBriefcaseFill,
} from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { GiCoins, GiBriefcase } from 'react-icons/gi'
import { HiHome, HiOutlineHome } from 'react-icons/hi'

const Icon = styled('span', {
  display: 'flex',
  justifyContent: 'center',
  padding: '6px',
  alignItems: 'center',
  background: '$background',
  maxWidth: '2rem',
  borderRadius: '100%',
  height: '24px',
  width: '24px',

  '& svg': {
    color: `$gray7`,
    '&:hover': {
      color: `$gray8`,
    },
    '&:active': {
      color: `$gray9`,
    },
  },
})

const items = [
  {
    link: '',
    label: 'Home',
    icon: <HiHome size={24} />,
  },
  {
    link: 'treasury',
    label: 'Treasury',
    icon: <BsPiggyBank size={24} />,
  },
  {
    link: 'members',
    label: 'Members',
    icon: <BsFillPeopleFill size={24} />,
  },
  {
    link: 'info',
    label: 'Info',
    icon: <RiInformationFill size={24} />,
  },
]
export default function Menu({ saleActive }) {
  const router = useRouter()
  const { chainId, dao } = router.query

  return (
    <Flex dir="col" gap="md">
      {items.map((item) => (
        <Item key={item.label} link={item.link} label={item.label} icon={item.icon} chainId={chainId} dao={dao} />
      ))}
      {saleActive === true && (
        <Item key={'Crowdsale'} link={'/crowdsale'} label={'Crowdsale'} icon={<GiCoins size={24} />} />
      )}
    </Flex>
  )
}

const Item = ({ link, label, icon, chainId, dao }) => {
  return (
    <Link
      href={{
        pathname: `/daos/[chainId]/[dao]/${link}`,
        query: { chainId: chainId, dao: dao },
      }}
      passHref
    >
      <Flex
        css={{
          alignItems: 'center',
          gap: '5px',
          padding: '5px',
          borderRadius: '20px',
          '&:hover': {
            background: '$gray5',
          },
          color: '$gray12',
        }}
      >
        <Icon>{icon}</Icon>
        <Text
          css={{
            fontFamily: 'Regular',
            fontSize: '24px',
          }}
        >
          {label}
        </Text>
      </Flex>
    </Link>
  )
}
