import { Metadata } from 'next'
import Footer from '@components/dao-dashboard/layout/Footer'
import Members from '@components/dao-dashboard/layout/Members'
import Profile from '@components/dao-dashboard/layout/Profile'
import Treasury from '@components/dao-dashboard/layout/Treasury'
import Header from '@components/layout/Header'
import Nav from '@components/dao-dashboard/layout/Nav'
import { Address } from 'viem'

type Props = {
  children: React.ReactNode
  params: { chainId: string; dao: Address }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao
  const heading = `Kali | ${dao}`

  return {
    title: heading,
    description: 'DAO Dashboard',
    openGraph: {
      title: heading,
      description: 'DAO Dashboard',
      images: [`https://app.kali.gg/api/og?title=${heading}`],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  }
}

export default function DashboardLayout({ children, params }: Props) {
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao

  return (
    <div className="bg-background p-0 min-h-screen">
      <Header />
      <div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-1">
            <Profile address={dao!} chainId={Number(chainId)} />
            <Nav address={dao!} chainId={Number(chainId)} />
            <Treasury address={dao!} chainId={Number(chainId)} />
            <Members />
          </div>
          <div>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
