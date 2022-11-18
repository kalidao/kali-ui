import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Button, IconGrid, Stack } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { layout, dashboardHeader, container } from './layout.css'
import Footer from '@components/dao-dashboard/layout/Footer'
import Members from '@components/dao-dashboard/layout/Members'
import Profile from '@components/dao-dashboard/layout/Profile'
import Wrappr from '@components/dao-dashboard/layout/Wrappr'
import Treasury from '@components/dao-dashboard/layout/Treasury'
import Header from '@components/layout/Header'
import Nav from '@components/dao-dashboard/layout/Nav'
import Swap from '@components/dao-dashboard/layout/Swap'
import Layout from '@components/layout'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const heading = `Kali | ${title}}`

  return (
    <Layout heading={heading} content={content}>
      <Box className={container}>
        <Stack>
          <Stack
            direction={{
              xs: 'vertical',
              lg: 'horizontal',
            }}
            justify="space-between"
          >
            <Profile address={dao as string} chainId={Number(chainId)} />
            <Nav address={dao as string} chainId={Number(chainId)} />
            <Treasury address={dao as string} chainId={Number(chainId)} />
            {/* <Swap  address={dao as string} chainId={Number(chainId)} /> */}
            <Wrappr address={dao as string} chainId={Number(chainId)} />
            <Members />
          </Stack>
          {children}
        </Stack>
      </Box>
      <Footer />
    </Layout>
  )
}

export default DashboardLayout
