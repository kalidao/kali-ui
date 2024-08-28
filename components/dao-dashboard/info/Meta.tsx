import React from 'react'
import { ethers } from 'ethers'
import { Card } from '@components/ui/card'
import { Info } from 'lucide-react'
import EthAddress from '@components/ui/eth-address'

import { Address } from 'viem'

type Props = {
  symbol: string
  totalSupply: number
  address: string
  chainId: number
}

export default function Meta({ symbol, totalSupply, address, chainId }: Props) {
  const info = [
    {
      label: 'Symbol',
      value: symbol,
      icon: <Info className="h-4 w-4" />,
    },
    {
      label: 'Total Supply',
      value: ethers.utils.formatEther(totalSupply),
      icon: <Info className="h-4 w-4" />,
    },
    {
      label: 'Address',
      value: <EthAddress address={address as Address} />,
      icon: <Info className="h-4 w-4" />,
    },
    {
      label: 'Chain ID',
      value: chainId,
      icon: <Info className="h-4 w-4" />,
    },
  ]

  return (
    <Card className="w-full p-6 space-y-4">
      {info.map((item, index) => (
        <div key={index} className="flex space-x-3 items-center justify-between">
          <div className="flex items-center space-x-2">
            {item.icon}
            <span className="text-sm text-gray-500">{item.label}</span>
          </div>
          <span className="font-bold">{item.value}</span>
        </div>
      ))}
    </Card>
  )
}
