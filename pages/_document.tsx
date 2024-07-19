import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

interface Props {
  theme: string
}

export default class MyDocument extends Document<Props> {
  render() {
    return (
      <Html
        lang="en"
        style={{
          backgroundColor: '#fff',
          color: 'black',
        }}
      >
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
            key="InterVar"
          />
          <link
            rel="preload"
            href="/fonts/Px-Grotesk-Screen.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            key="PxGroteskScreen"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
