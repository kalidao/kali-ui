import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../styles/stitches.config'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body
          style={{
            background: 'hsl(0, 0%, 5%)',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
