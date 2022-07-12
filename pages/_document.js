import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../styles/stitches.config'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <link
            rel="preload"
            href="/fonts/Px-Grotesk-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Px-Grotesk-Light.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="preload" href="/fonts/Px-Grotesk-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link
            rel="preload"
            href="/fonts/Px-Grotesk-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Px-Grotesk-Screen.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: 'Regular';
                  font-weight: 400;
                  font-display: swap;
                  src: url(/fonts/Px-Grotesk-Regular.woff2) format('woff2');
                }
                @font-face {
                  font-family: 'Light';
                  font-weight: 300;
                  font-display: swap;
                  src: url(./fonts/Px-Grotesk-Light.woff2) format('woff2');
                }
                @font-face {
                  font-family: 'Bold';
                  font-weight: 800;
                  font-display: swap;
                  src: url(./fonts/Px-Grotesk-Bold.woff2) format('woff2');
                }
                @font-face {
                  font-family: 'Italic';
                  font-weight: normal;
                  font-style: italic;
                  font-display: swap;
                  src: url('/fonts/Px-Grotesk-Italic.woff2') format('woff2');
                }
                @font-face {
                  font-family: 'Screen';
                  font-weight: 500;
                  font-display: swap;
                  src: url('/fonts/Px-Grotesk-Screen.woff2') format('woff2');
                }
                `,
            }}
          />
        </Head>
        <body
          style={{
            background: '#36393f',
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
