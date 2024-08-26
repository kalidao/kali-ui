'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@components/ui/button'
import { Pencil } from 'lucide-react'
import UserDAOs from '@components/home/UserDAOs'
import FAQ from '@components/home/FAQ'
import { useAccount } from 'wagmi'
import Balancer from 'react-wrap-balancer'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { address, isConnected } = useAccount()

  const goTo = (to: string) => {
    setLoading(true)
    if (to === 'explore') {
      router.push('/explore')
    }
    if (to === 'create') {
      router.push('/create')
    }
    setLoading(false)
  }

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
          <Button
            onClick={() => goTo('create')}
            disabled={loading}
            size="lg"
            className="flex items-center gap-2 text-lg px-8 py-4"
          >
            <Pencil className="h-5 w-5" />
            Create Your DAO
          </Button>
        </div>
      </div>

      {isConnected && (
        <div className="py-8">
          <UserDAOs address={address as string} />
        </div>
      )}

      <div className="py-8">
        <FAQ />
      </div>
    </div>
  )
}
