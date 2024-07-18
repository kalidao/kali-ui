import { useMemo } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Button } from '@components/ui/button'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { DashboardElementProps } from './types'
import { fetcher } from '@utils/fetcher'
import { ethers } from 'ethers'
import { prettyDate } from '@utils/prettyDate'
import { BookOpen } from 'lucide-react'

const Treasury = ({ address, chainId }: DashboardElementProps) => {
  const { data, isLoading, isError } = useQuery(
    ['daoTreasuryDashboard', address, chainId],
    () =>
      fetcher(
        `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
        {
          method: 'GET',
        },
      ),
    {
      enabled: !!address && !!chainId,
    },
  )

  const totalBalance = useMemo(
    () =>
      data?.data?.items?.reduce((acc: number, item: any) => {
        console.log('acc total balance')
        return (
          acc +
          parseFloat(ethers.utils.formatUnits(item?.balance, item?.contract_decimals)) * parseFloat(item?.quote_rate)
        )
      }, 0),
    [data],
  )

  const lastUpdated = data?.data?.updated_at ? `Last updated ${prettyDate(new Date(data?.data?.updated_at))}` : null

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Treasury</CardTitle>
          {data && data?.error !== true && (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              {chainId === 5 ? '🤪' : `$${totalBalance.toFixed(2)}`}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>}
        {isError && <p className="text-red-500">Something went wrong</p>}
        {data && data?.error === true && <p className="text-red-500">Something went wrong</p>}
        {data &&
          data?.data?.items?.length > 0 &&
          data?.data?.items?.slice(0, 3).map((item: any) => (
            <div key={item?.contract_address} className="bg-gray-100 p-2 rounded-md mb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={item?.logo_url} alt={`${item?.contract_name} logo`} />
                    <AvatarFallback>{item?.contract_ticker_symbol}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{item?.contract_ticker_symbol}</span>
                </div>
                <span>{parseFloat(ethers.utils.formatUnits(item?.balance, item?.contract_decimals)).toFixed(2)}</span>
              </div>
            </div>
          ))}
      </CardContent>
      <div className="flex items-center justify-between p-4">
        <Link href={`/daos/${chainId}/${address}/treasury`} passHref>
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            View All
          </Button>
        </Link>
        <span className="text-sm text-gray-500">{lastUpdated}</span>
      </div>
    </Card>
  )
}

export default Treasury
