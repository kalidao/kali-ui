import { useState, useEffect } from 'react'
import { Text, Card, Box, IconCog, IconBookOpen, IconTokens, IconCollection, IconBriefcase } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { addresses } from '@constants/addresses'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import DATAROOM_ABI from '@abi/DataRoom.json'
import { AddressZero } from '@ethersproject/constants'
import { navItem, navMenu } from './layout.css'
import Wrappr from './Wrappr'
import { fetchDaoProject } from '../newproposal/apps/utils/fetchDaoProjects'

const Nav = ({ address, chainId }: DashboardElementProps) => {
  const router = useRouter()
  const { data: swap } = useContractRead({
    address: chainId ? addresses?.[chainId]?.['extensions']['crowdsale2'] : AddressZero,
    abi: SWAP_ABI,
    chainId: chainId,
    functionName: 'crowdsales',
    args: [address],
  })

  const { data: haveRoom } = useContractRead({
    address: chainId ? addresses?.[chainId]?.['extensions']['dataRoom'] : AddressZero,
    abi: DATAROOM_ABI,
    chainId: chainId,
    functionName: 'authorized',
    args: [address, address],
  })

  const [haveProject, setHaveProject] = useState(false)

  const itemSize = '12'
  const itemColor = 'foreground'
  const items = [
    {
      id: 0,
      title: 'Learn',
      icon: <IconBookOpen size={itemSize} color={itemColor} />,
      href: `/daos/${chainId}/${address}/info`,
      active: router.asPath === `/daos/${chainId}/${address}/info` ? true : false,
    },
    {
      id: 1,
      title: 'Settings',
      icon: <IconCog size={itemSize} color={itemColor} />,
      href: `/daos/${chainId}/${address}/settings`,
      active: router.asPath === `/daos/${chainId}/${address}/settings` ? true : false,
    },
  ]

  // @ts-ignore
  if (swap && swap?.saleEnds * 1000 > Date.now()) {
    items.push({
      id: 2,
      title: 'Swap',
      icon: <IconTokens size={itemSize} color={itemColor} />,
      href: `/daos/${chainId}/${address}/swap`,
      active: router.asPath === `/daos/${chainId}/${address}/swap` ? true : false,
    })
  }

  if (haveRoom) {
    items.push({
      id: 3,
      title: 'Data Room',
      icon: <IconCollection size={itemSize} color={itemColor} />,
      href: `/daos/${chainId}/${address}/room`,
      active: router.asPath === `/daos/${chainId}/${address}/room` ? true : false,
    })
  }

  if (haveProject) {
    items.push({
      id: 3,
      title: 'Projects',
      icon: <IconBriefcase size={itemSize} color={itemColor} />,
      href: `/daos/${chainId}/${address}/projects`,
      active: router.asPath === `/daos/${chainId}/${address}/projects` ? true : false,
    })
  }

  useEffect(() => {
    const getProjects = async () => {
      const p = await fetchDaoProject(address, chainId)
      if (p.projects.length > 0) {
        setHaveProject(true)
      }
    }

    getProjects()
  }, [address, chainId])

  return (
    <Card padding="6" width="full">
      <Box className={navMenu}>
        {items.map((item) => (
          <NavCard title={item.title} href={item.href} icon={item.icon} active={item.active} key={item.id} />
        ))}
        <Wrappr address={address} chainId={chainId} />
      </Box>
    </Card>
  )
}

type NavCardProps = {
  title: string
  href: string
  icon: React.ReactNode
  active: Boolean
  isExternal?: Boolean
}

const NavCard = ({ title, href, icon, active }: NavCardProps) => {
  return (
    <Link href={href} passHref>
      <Box as="a" className={navItem} backgroundColor={active ? 'accentSecondary' : 'background'}>
        <Box>{icon}</Box>
        <Text>{title}</Text>
      </Box>
    </Link>
  )
}

export default Nav
