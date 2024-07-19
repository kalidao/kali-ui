import Header from './Header'
import Head from 'next/head'
import Footer from '@components/dao-dashboard/layout/Footer'

type LayoutProps = {
  heading?: string
  content: string
  children: React.ReactNode
}

export default function Layout({ heading, content, children }: LayoutProps) {
  const title = `Kali | ${heading}`
  return (
    <div className="flex flex-col">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" name="description" content={content} key="description" />
        <meta property="og:image" content={`https://app.kali.gg/api/og?title=${title}`} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" key="icon-apple" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" key="icon-32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" key="icon-16" />
        <link rel="manifest" href="/site.webmanifest" key="webmanifest" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <Header />
      <main className="flex-grow min-h-screen container mx-auto bg-background px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
