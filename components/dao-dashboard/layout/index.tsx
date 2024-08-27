'use client'
import { useParams } from 'next/navigation'
import Head from 'next/head'
import Footer from '@components/dao-dashboard/layout/Footer'
import Members from '@components/dao-dashboard/layout/Members'
import Profile from '@components/dao-dashboard/layout/Profile'
import Treasury from '@components/dao-dashboard/layout/Treasury'
import Header from '@components/layout/Header'
import Nav from '@components/dao-dashboard/layout/Nav'
import { Address } from 'viem'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao

  const heading = `Kali | ${title}`

  return (
    <>
      <div className="bg-background p-0 min-h-screen">
        <Head>
          <title>{heading}</title>
          <meta property="og:title" content={title} key="title" />
          <meta property="og:description" name="description" content={content} key="description" />
          <meta property="og:image" content={`https://app.kali.gg/api/og?title=${heading}`}></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="icon-apple" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="icon-32" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="icon-16" />
          <link rel="manifest" href="/site.webmanifest" key="webmanifest" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        </Head>
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
      </div>
      <Footer />
    </>
  )
}

export default DashboardLayout
