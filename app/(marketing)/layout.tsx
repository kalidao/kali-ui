import Header from '@components/layout/Header'
import Footer from '@components/dao-dashboard/layout/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow min-h-screen container mx-auto bg-background px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
