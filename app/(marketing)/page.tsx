import React from 'react'
import { Pencil } from 'lucide-react'
import { UserDAOs } from './user-daos'
import FAQ from '@components/home/FAQ'
import Balancer from 'react-wrap-balancer'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      <div className="text-center space-y-12">
        <h1 className="text-foreground text-5xl font-bold leading-tight">
          <Balancer>A fully-formed governance stack for your community.</Balancer>
        </h1>
        <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
          <Balancer>Empower your community with decentralized decision-making and transparent governance.</Balancer>
        </p>
        <div className="pt-8 w-full flex items-center justify-center">
          <Link href="/create" className="bg-primary rounded-lg flex items-center gap-2 text-lg px-4 py-2">
            <Pencil className="h-5 w-5" />
            Create Your DAO
          </Link>
        </div>
      </div>
      <UserDAOs />
      <div className="py-8">
        <FAQ />
      </div>
    </div>
  )
}
