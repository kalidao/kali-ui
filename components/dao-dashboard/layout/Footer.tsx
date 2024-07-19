import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-background w-full flex items-center justify-between z-10 p-2">
      <p className="text-secondary-foreground">Built by KaliCo.</p>
      <div className="flex items-center space-x-2">
        <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
          Privacy Policy
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/tos" className="text-blue-600 hover:text-blue-800">
          Terms of Service
        </Link>
      </div>
    </footer>
  )
}

export default Footer
