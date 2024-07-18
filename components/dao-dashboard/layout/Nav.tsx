import { Coins, FileStack, Cog, BookOpen } from 'lucide-react'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import { DashboardElementProps } from './types'
import Link from 'next/link'
import { addresses } from '@constants/addresses'
import SWAP_ABI from '@abi/KaliDAOcrowdsaleV2.json'
import DATAROOM_ABI from '@abi/DataRoom.json'
import { AddressZero } from '@ethersproject/constants'
import Wrappr from './Wrappr'
import { cn } from '@utils/util'
import { Card } from '@components/ui/card'

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

  const items = [
    {
      id: 0,
      title: 'Learn',
      icon: <BookOpen className="h-6 w-6" />,
      href: `/daos/${chainId}/${address}/info`,
      active: router.asPath === `/daos/${chainId}/${address}/info`,
    },
    {
      id: 1,
      title: 'Settings',
      icon: <Cog className="h-6 w-6" />,
      href: `/daos/${chainId}/${address}/settings`,
      active: router.asPath === `/daos/${chainId}/${address}/settings`,
    },
  ]

  // @ts-ignore
  if (swap && swap?.saleEnds * 1000 > Date.now()) {
    items.push({
      id: 2,
      title: 'Swap',
      icon: <Coins className="h-6 w-6" />,
      href: `/daos/${chainId}/${address}/swap`,
      active: router.asPath === `/daos/${chainId}/${address}/swap`,
    })
  }

  if (haveRoom) {
    items.push({
      id: 3,
      title: 'Data Room',
      icon: <FileStack className="h-6 w-6" />,
      href: `/daos/${chainId}/${address}/room`,
      active: router.asPath === `/daos/${chainId}/${address}/room`,
    })
  }

  return (
    <Card className="w-full p-6">
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <NavCard title={item.title} href={item.href} icon={item.icon} active={item.active} key={item.id} />
        ))}
        <Wrappr address={address} chainId={chainId} />
      </div>
    </Card>
  )
}

type NavCardProps = {
  title: string
  href: string
  icon: React.ReactNode
  active: boolean
  isExternal?: boolean
}

const NavCard = ({ title, href, icon, active }: NavCardProps) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-lg transition-colors',
        active ? 'bg-accent text-accent-foreground' : 'bg-background hover:bg-accent/10',
      )}
    >
      <span className="mb-2">{icon}</span>
      <p className="text-sm font-medium">{title}</p>
    </Link>
  )
}

export default Nav
