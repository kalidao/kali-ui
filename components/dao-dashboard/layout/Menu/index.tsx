import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { BsPiggyBank, BsFillPeopleFill } from 'react-icons/bs'
import { GiCoins } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import { FaPen } from 'react-icons/fa'
import { GearIcon } from '@radix-ui/react-icons'
import { useGetCrowdsale } from '@graph/queries/getCrowdsale'
import { IconTokens, IconCogSolid, IconPencil, IconUserGroupSolid, Stack, Button } from '@kalidao/reality'
import type { ReactNodeNoStrings } from '@kalidao/reality/dist/types/types'

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
      icon: <IconTokens />,
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
      icon: <IconUserGroupSolid />,
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
      icon: <IconCogSolid />,
      active: true,
    },
    {
      link: 'propose',
      label: 'Propose',
      icon: <IconPencil />,
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
      <Button as="a" justifyContent={"space-between"} prefix={icon as ReactNodeNoStrings} variant="transparent" width="full">
        {label}
      </Button>
    </Link>
  )
}
