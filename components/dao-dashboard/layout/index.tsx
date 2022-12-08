import { useRouter } from 'next/router'
import { Box, Stack } from '@kalidao/reality'
import Head from 'next/head'
import { layout, container } from './layout.css'
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
    <Box className={layout}>
      <Head>
        <title>{heading}</title>
        <meta name="description" content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
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
            <Members />
          </Stack>
          {children}
        </Stack>
      </Box>
      <Footer />
    </Box>
  )
}

export default DashboardLayout
