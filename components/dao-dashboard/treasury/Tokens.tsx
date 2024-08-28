import React from 'react'
import { useAccountBalance } from 'ankr-react'
import { Card, CardContent } from '@components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Coins } from 'lucide-react'
import { Address } from 'viem'

interface TokensProps {
  address: Address
  chainId: number
}

export default function Tokens({ address, chainId }: TokensProps) {
  const { data, isLoading, error } = useAccountBalance({
    walletAddress: address,
  })

  return (
    <div className="space-y-4">
      {error ? (
        <p className="text-red-500">There was an error fetching tokens.</p>
      ) : data ? (
        <>
          {data && !error && (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              {`$${data.totalBalanceUsd}`}
            </span>
          )}
          {data.assets.map((item) => (
            <div key={item.contractAddress ?? 'native'} className="bg-secondary p-2 rounded-md mb-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={item?.thumbnail} alt={`${item?.tokenName} logo`} />
                    <AvatarFallback>{item?.tokenSymbol}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{item.tokenSymbol}</span>
                </div>
                <span>{item.balance}</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-gray-500">There are no Tokens in this DAO ☹️</p>
      )}
    </div>
  )
}
