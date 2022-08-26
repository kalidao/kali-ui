import React from 'react'
import { useRouter } from 'next/router'
import { Flex, Text } from '../../../../styles/elements'
import Link from 'next/link'
import { styled } from '../../../../styles/stitches.config'
import { RiInformationFill } from 'react-icons/ri'
import { BsPiggyBank, BsFillPeopleFill } from 'react-icons/bs'
import { GiCoins } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import { FaPen } from 'react-icons/fa'
import { GearIcon } from '@radix-ui/react-icons'
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

export default function Sidebar({ crowdsale }) {
  const router = useRouter()
  const { chainId, dao } = router.query

  const items = [
    {
      link: '',
      label: 'Home',
      icon: <HiHome />,
      active: true,
    },
    {
      link: 'crowdsale',
      label: 'Contribute',
      icon: <GiCoins />,
      active: crowdsale?.active,
    },
    {
      link: 'treasury',
      label: 'Treasury',
      icon: <BsPiggyBank />,
      active: true,
    },
    {
      link: 'members',
      label: 'Members',
      icon: <BsFillPeopleFill />,
      active: true,
    },
    // TODO: Add analytics
    // {
    //   link: 'analytics',
    //   label: 'Analytics',
    //   icon: <RiInformationFill />,
    //   active: true,
    // },
    {
      link: 'settings',
      label: 'Settings',
      icon: <GearIcon />,
      active: true,
    },
    {
      link: 'propose',
      label: 'Propose',
      icon: <FaPen />,
      active: true,
    },
  ]

  return (
    <Flex
      css={{
        position: 'fixed',
        left: 0,
        padding: '10px',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        boxShadow: 'rgba(0, 0, 0, 0.28) 0px 2px 4px',

        '@media (max-width: 640px)': {
          position: 'fixed',
          padding: '0',
          bottom: 0,
          right: 0,
          left: 0,
          flexDirection: 'row',
          height: '8rem',
          background: '$gray2',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      {items
        .filter((item) => item.active === true)
        .map((item) => (
          <Item key={item.label} link={item.link} label={item.label} icon={item.icon} chainId={chainId} dao={dao} />
        ))}
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
          justifyContent: 'flex-start',
          gap: '5px',
          borderRadius: '20px',
          color: '$gray12',
          padding: '5px',
          width: '8rem',

          '&:hover': {
            background: '$gray2',
          },
          '@media (max-width: 640px)': {
            borderRadius: '100%',
            justifyContent: 'center',
            height: '24px',
            width: '24px',
            padding: '10px',
          },
        }}
      >
        <Icon>{icon}</Icon>
        <Text
          css={{
            fontFamily: 'Regular',
            fontSize: '16px',

            '@media (max-width: 640px)': {
              display: 'none',
            },
          }}
        >
          {label}
        </Text>
      </Flex>
    </Link>
  )
}
