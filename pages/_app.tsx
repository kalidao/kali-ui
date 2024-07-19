import React from 'react'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import NextNProgress from 'nextjs-progressbar'
import { RootProviders } from '@components/root-providers'
import '@design/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootProviders>
      <NextNProgress color="#5842c3" />
      <Component {...pageProps} />
    </RootProviders>
  )
}

export default MyApp
