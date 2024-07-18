import React from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Menu } from './Menu'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <Link href="/" className="text-2xl font-bold text-violet-600 hover:text-blue-800 transition-colors" passHref>
        KALI
      </Link>
      <div className="flex items-center gap-4">
        <ConnectButton label="Login" />
        <Menu />
      </div>
    </header>
  )
}
