'use client'
import React, { useState } from 'react'
import { NextPage } from 'next'
import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { Tokens, NFTs } from '@components/dao-dashboard/treasury'
import { Coins, ImageIcon } from 'lucide-react'
import { Address } from 'viem'
import { useParams, useRouter } from 'next/navigation'

const Treasury: NextPage = () => {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const daoAddress = params?.dao as Address

  const [show, setShow] = useState('tokens')

  const render = () => {
    if (show === 'tokens') {
      return <Tokens address={daoAddress} chainId={chainId} />
    }

    if (show === 'nft') {
      // if (chainId in [1, 4, 137, 80001]) {
      //   return <p className="text-sm text-gray-500">We are working on bringing Treasury support for your chain.</p>
      // } else {
      return <NFTs address={daoAddress} chainId={chainId} />
      // }
    }
  }

  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <Button
              variant={show === 'tokens' ? 'secondary' : 'ghost'}
              onClick={() => setShow('tokens')}
              className="flex items-center"
            >
              <Coins className="mr-2 h-4 w-4" />
              Tokens
            </Button>
            <Button
              variant={show === 'nft' ? 'secondary' : 'ghost'}
              onClick={() => setShow('nft')}
              className="flex items-center"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              NFTs
            </Button>
          </div>
          <div>{render()}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Treasury
