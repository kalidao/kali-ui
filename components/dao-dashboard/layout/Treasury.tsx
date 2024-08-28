'use client'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Button } from '@components/ui/button'
import Link from 'next/link'
import { DashboardElementProps } from './types'
import { BookOpen } from 'lucide-react'
import { useAccountBalance } from 'ankr-react'

const Treasury = ({ address, chainId }: DashboardElementProps) => {
  const { data, isLoading, error } = useAccountBalance({
    walletAddress: address,
  })

  return (
    <Card className="w-full flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Treasury</CardTitle>
          {data && !error && (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              {`$${data.totalBalanceUsd}`}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        ) : error ? (
          <p className="text-red-500">Something went wrong</p>
        ) : (
          data &&
          data.assets &&
          data.assets.slice(0, 3).map((item) => (
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
          ))
        )}
      </CardContent>
      <div className="flex items-center justify-between p-4">
        <Link href={`/daos/${chainId}/${address}/treasury`} passHref>
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            View All
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default Treasury
