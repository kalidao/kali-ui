import React from 'react'
import { ethers } from 'ethers'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { Card, CardContent } from '@components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Coins } from 'lucide-react'
import { Address } from 'viem'

interface TokensProps {
  address: Address
  chainId: number
}

export default function Tokens({ address, chainId }: TokensProps) {
  const { data, isLoading, isError, isFetched } = useQuery(
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

  return (
    <div className="space-y-4">
      {data && data.error === true ? (
        <p className="text-red-500">There was an error fetching tokens.</p>
      ) : data?.data?.items?.length > 0 ? (
        data?.data?.items?.map((token: any) => (
          <TokenCard
            key={token?.contract_address}
            name={token?.contract_name}
            symbol={token?.contract_ticker_symbol}
            logo_url={token?.logo_url}
            balance={token?.balance}
            decimals={token?.contract_decimals}
            price={token?.quote_rate}
          />
        ))
      ) : (
        <p className="text-gray-500">There are no Tokens in this DAO ☹️</p>
      )}
    </div>
  )
}

type TokenProps = {
  name: string
  symbol: string
  logo_url: string
  balance: string
  decimals: number
  price: string
}

function TokenCard({ name, symbol, logo_url, balance, decimals }: TokenProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {logo_url ? (
            <Avatar>
              <AvatarImage src={logo_url} alt={`${name} logo`} />
              <AvatarFallback>{symbol}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarFallback>
                <Coins className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          )}
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold">{Number(ethers.utils.formatUnits(balance, decimals)).toFixed(2)}</span>
          <span>{symbol}</span>
        </div>
      </CardContent>
    </Card>
  )
}
