import Head from 'next/head'
import { useAccount } from 'wagmi'
import { Chat } from "@pushprotocol/uiweb";
import { AddressZero } from '@ethersproject/constants';
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Button, IconGrid, Stack } from '@kalidao/reality'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { layout, dashboardHeader, container } from '@components/dao-dashboard/layout/layout.css'
import Footer from '@components/dao-dashboard/layout/Footer'
import Members from '@components/dao-dashboard/layout/Members'
import Profile from '@components/dao-dashboard/layout/Profile'
import Wrappr from '@components/dao-dashboard/layout/Wrappr'
import Treasury from '@components/dao-dashboard/layout/Treasury'
import Header from '@components/layout/Header'
import Nav from '@components/dao-dashboard/layout/Nav'
import Swap from '@components/dao-dashboard/layout/Swap'

type LayoutProps = {
  heading?: string
  content: string
  children: React.ReactNode
}

export default function Layout({ heading, content, children }: LayoutProps) {
  const { address } = useAccount()
  return (
    <Box className={layout}>
    <Head>
    <title>{heading}</title>
        <meta property="og:title" content={heading} key="title" />
        <meta property="og:description" name="description" content={content} key="description" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="icon-apple" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="icon-32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="icon-16" />
        <link rel="manifest" href="/site.webmanifest" key="webmanifest" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
    <Header />
    <Box className={container}>
        {children}
    </Box>
    <Footer />
    {address && <Chat
        account={address ? address : AddressZero} //user address
        supportAddress="0xC316f415096223561e2077c30A26043499d579aD" //support address
        apiKey={process.env.NEXT_PUBLIC_PUSH_SUPPORT_API_KEY}
        env="staging"
        primaryColor={"#5842c3"}
        modalTitle="Support"
      />}
  </Box>
  )
}
