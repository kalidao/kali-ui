import { Metadata, Viewport } from 'next'

import { siteConfig } from '@utils/config'
import '@design/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import { mono, sans } from '@utils/fonts'
import { cn } from '@utils/util'
import { RootProviders } from '@components/root-providers'

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.author,
    },
  ],
  generator: 'Next.js',
  keywords: siteConfig.keywords,
  icons: {
    icon: '/logo.webp',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.baseUrl,
    siteId: siteConfig.twitterId,
    creator: siteConfig.author,
    creatorId: siteConfig.twitterId,
    description: siteConfig.description,
    title: siteConfig.name,
  },
}

export const viewport: Viewport = {
  width: 'device-width', // This will make the width of the page follow the screen-width of the device (which will vary depending on the device).
  height: 'device-height', // Similar to the above, but for height.
  initialScale: 1, // This defines the ratio between the device width (device-width in portrait mode or device-height in landscape mode) and the viewport size.
  minimumScale: 1, // This defines the minimum zoom level to which the user can zoom out. Keeping this as 1 disallows the user to zoom out beyond the initial scale.
  maximumScale: 1, // This defines the maximum zoom level to which the user can zoom in. This can be set as per your requirement.
  userScalable: false, // This allows the user to zoom in or out on the webpage. 'no' will prevent the user from zooming.
  viewportFit: 'cover', // This can be set to 'auto', 'contain', or 'cover'. 'cover' implies that the viewport should cover the whole screen.
  interactiveWidget: 'resizes-visual', // This can be set to 'resizes-visual', 'resizes-content', or 'overlays-content'. 'resizes-visual' implies that the widget can resize the visual viewport.
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(mono.variable, sans.variable)} suppressHydrationWarning>
      <head>
        <meta name="application-name" content={siteConfig.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="description" content={siteConfig.description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </head>
      <body className="m-0 h-full p-0">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
