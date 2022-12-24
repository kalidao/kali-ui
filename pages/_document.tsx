import React from 'react'
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

interface Props {
  theme: string
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
    const initialProps = await Document.getInitialProps(ctx)

    let theme = 'dark'
    const cookies = ctx?.req?.headers?.cookie
    if (cookies) {
      const themeCookie = cookies.split(';').find((c) => c.trim().startsWith('mode='))
      if (themeCookie) {
        theme = themeCookie.split('=')[1]
      }
      console.log('cookies: ', cookies)
    }

    return { ...initialProps, theme }
  }

  render() {
    console.log('theme: ', this.props.theme)
    return (
      <Html
        lang="en"
        style={{
          backgroundColor: this.props.theme === 'dark' ? '#000' : '#fff',
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
