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

type Props = {
  title: string
  content: string
  children: React.ReactNode
}

const DashboardLayout = ({ title, content, children }: Props) => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const heading = `Kali | ${title}}`
  // const { data, error } = useQuery(['keep', chainId, keep], async () =>
  //   fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/`),
  // )
  // const heading = title + data ? ((' ' + data?.name) as string) + ' ' : '' + '- Keep'
  // const { data: treasury, error: treasuryError } = useQuery(['keep', 'treasury', chainId, keep], async () =>
  //   fetcher(`${process.env.NEXT_PUBLIC_KEEP_API}/keeps/${chainId}/${keep}/treasury`),
  // )

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
          <Stack direction={{
            xs: 'vertical',
            lg: 'horizontal',
          }} justify="space-between">
            <Profile address={dao as string} chainId={Number(chainId)} />
            <Treasury address={dao as string} chainId={Number(chainId)}  />
            <Wrappr address={dao as string} chainId={Number(chainId)} />
            <Members />
          </Stack>
          {children}
        </Stack>
      </Box>
    </Box>
    
  )
}

export default DashboardLayout
