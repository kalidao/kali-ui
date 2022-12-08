import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
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
