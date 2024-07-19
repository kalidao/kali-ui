import { useRouter } from 'next/router'
import Head from 'next/head'
import Footer from '@components/dao-dashboard/layout/Footer'
import Members from '@components/dao-dashboard/layout/Members'
import Profile from '@components/dao-dashboard/layout/Profile'
import Treasury from '@components/dao-dashboard/layout/Treasury'
import Header from '@components/layout/Header'
import Nav from '@components/dao-dashboard/layout/Nav'

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const router = useRouter()
  const { chainId, dao } = router.query
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Profile address={dao as string} chainId={Number(chainId)} />
              <Nav address={dao as string} chainId={Number(chainId)} />
              <Treasury address={dao as string} chainId={Number(chainId)} />
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
