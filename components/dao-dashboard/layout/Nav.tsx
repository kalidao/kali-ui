import { Text, Card, Box, IconCog, IconBookOpen, IconTokens } from '@kalidao/reality'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { addresses } from '@constants/addresses'
import { SWAP_ABI } from '@abi/index'
import { AddressZero } from '@ethersproject/constants'
import { navItem, navMenu } from './layout.css'
import Wrappr from './Wrappr'

const Nav = ({ address, chainId }: DashboardElementProps) => {
  const router = useRouter()
  const {
    data: swap,
    isLoading: isSwapLoading,
    error: swapError,
    isError: isSwapError,
  } = useContractRead({
    address: chainId ? addresses?.[chainId]?.['extensions']['crowdsale2'] : AddressZero,
    abi: SWAP_ABI,
    chainId: chainId,
    functionName: 'crowdsales',
    args: [address],
  })

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

  if (swap && swap.saleEnds * 1000 > Date.now()) {
    items.push({
      id: 2,
      title: 'Swap',
      icon: <IconTokens size={itemSize} color={itemColor} />,
      href: `/daos/${chainId}/${address}/swap`,
      active: router.asPath === `/daos/${chainId}/${address}/swap` ? true : false,
    })
  }

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

const NavCard = ({ title, href, icon, active, isExternal }: NavCardProps) => {
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
