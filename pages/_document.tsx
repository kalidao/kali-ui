import React from 'react'
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

interface MyDocumentProps extends DocumentInitialProps {
  theme: string
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    let theme = 'dark'
    if (ctx.req && ctx.req.headers.cookie) {
      console.log('cookie values: ', ctx.req.headers.cookie)
      const cookies = ctx.req.headers.cookie.split(';')
      const mode = cookies.find((cookie) => cookie.includes('mode'))?.split('=')[1]
      console.log('mode: ', mode)
      theme = mode === 'dark' ? 'dark' : 'light'
    }

    return { ...initialProps, theme } as MyDocumentProps
  }

  render() {
    console.log('theme: ', this.props)
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
