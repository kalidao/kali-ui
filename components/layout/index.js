import Header from './Header'
import Head from 'next/head'
import { Box, Flex } from '../../styles/elements'

export default function Layout({ heading, content, children, props }) {
  const title = 'KALI - ' + heading
  console.log(children)
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" name="description" content={content} key="description" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="icon-apple" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="icon-32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="icon-16" />
        <link rel="manifest" href="/site.webmanifest" key="webmanifest" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <Flex
        css={{
          width: '100%',
          height: '100rem',
          // background: 'Red',
          fontFamily: 'Screen',
        }}
        {...props}
      >
        <Header heading={heading} />
        {children}
      </Flex>
    </div>
  )
}
