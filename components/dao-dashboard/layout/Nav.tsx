import {
  Avatar,
  Card,
  Heading,
  Skeleton,
  Box,
  Spinner,
  Stack,
  Stat,
  Button,
  IconArrowRight,
  IconTokens,
  IconLightningBolt,
  IconCog,
  IconBookOpen,
} from '@kalidao/reality'
import { useRouter } from 'next/router'
import { chain, useContractRead, useQuery } from 'wagmi'
import { getDaoInfo } from '@graph/queries'
import { ethers } from 'ethers'
import { formatVotingPeriod } from '@utils/votingPeriod'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { addresses } from '@constants/addresses'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import { AddressZero } from '@ethersproject/constants'
import { navItem, navMenu } from './layout.css'

const Nav = ({ address, chainId }: DashboardElementProps) => {
  const router = useRouter()
  const {
    data: swap,
    isLoading: isSwapLoading,
    error: swapError,
    isError: isSwapError,
  } = useContractRead({
    addressOrName: chainId ? addresses?.[chainId]?.['extensions']['crowdsale2'] : AddressZero,
    contractInterface: SWAP_ABI,
    chainId: chainId,
    functionName: 'crowdsales',
    args: [address],
  })

  const itemSize = '16'
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
    // {
    //     id: 2,
    //     title: 'Tribute',
    //     icon: <IconLightningBolt size={itemSize} color={itemColor} />,
    //     href: `/daos/${chainId}/${address}/tribute`
    // }
  ]

  // TODO
  // if (!isSwapLoading && !isSwapError && swap) {
  //   if (swap?.saleEnds < Date.now()) {
  //     items.push({
  //       id: items.length + 1,
  //       title: 'Swap',
  //       icon: <IconTokens size={itemSize} color={itemColor} />,
  //       href: `/daos/${chainId}/${address}/swap`,
  //       active: router.asPath === `/daos/${chainId}/${address}/swap` ? true : false,
  //     })
  //   }
  // }

  return (
    <Card padding="6" width="full">
      <Box className={navMenu}>
        {items.map((item) => (
          <NavCard title={item.title} href={item.href} icon={item.icon} active={item.active} key={item.id} />
        ))}
      </Box>
    </Card>
  )
}

type NavCardProps = {
  title: string
  href: string
  icon: React.ReactNode
  active: Boolean
}

const NavCard = ({ title, href, icon, active }: NavCardProps) => {
  return (
    <Link href={href} passHref>
      <Box as="a" className={navItem} backgroundColor={active ? 'accentSecondary' : 'background'}>
        {icon}
        <Heading>{title}</Heading>
      </Box>
    </Link>
  )
}

export default Nav
