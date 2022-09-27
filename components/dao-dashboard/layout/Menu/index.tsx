import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { styled } from '@design/stitches.config'
import { Flex, Text } from '@design/elements'

import { BsPiggyBank, BsFillPeopleFill } from 'react-icons/bs'
import { GiCoins } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import { FaPen } from 'react-icons/fa'
import { GearIcon } from '@radix-ui/react-icons'
import { useGetCrowdsale } from '@graph/queries/getCrowdsale'
import { Stack } from '@kalidao/reality'

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

export default function Menu() {
  const router = useRouter()
  const { chainId, dao } = router.query!
  const useGetCrowdsaleResult = useGetCrowdsale(chainId, dao)
  const crowdsale =
    useGetCrowdsaleResult?.data?.data?.crowdsales?.[0] === undefined
      ? false
      : useGetCrowdsaleResult?.data?.data?.crowdsales?.[0]?.active

  const items = [
    {
      link: '',
      label: 'Home',
      icon: <HiHome />,
      active: true,
    },
    {
      link: 'swap',
      label: 'Swap',
      icon: <GiCoins />,
      active: true,
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
    <Stack direction={'vertical'}>
      {items
        .filter((item) => item.active === true)
        .map((item) => (
          <Item
            key={item.label}
            link={item.link}
            label={item.label}
            icon={item.icon}
            chainId={chainId as string}
            dao={dao as string}
          />
        ))}
    </Stack>
  )
}

type ItemProps = {
  link: string
  label: string
  icon: React.ReactNode
  chainId: string
  dao: string
}

const Item = ({ link, label, icon, chainId, dao }: ItemProps) => {
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
          gap: '10px',
          borderRadius: '10px',
          color: '$gray12',
          paddingRight: '15px',
          // width: '100%',

          '&:hover': {
            background: '$gray5',
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
