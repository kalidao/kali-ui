import Header from './Header'
import Head from 'next/head'
import { Box } from '../../styles/elements'

export default function Layout({ heading, children, props }) {
  return (
    <>
      <Box
        css={{
          fontFamily: 'Display',
        }}
        {...props}
      >
        <Head>
          <title>{heading}</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <Header heading={heading} />
        {children}
      </Box>
    </>
  )
}
