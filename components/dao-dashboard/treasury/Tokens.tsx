import React from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { Skeleton, Text, Stack, Avatar } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
export default function Tokens() {
  const router = useRouter()
  const address = router.query.dao
  const chainId = router.query.chainId
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
    <Stack>
      {data && data.error === true ? (
        'There was an error fetching tokens.'
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
        <Text>here are no Tokens in this DAO ☹️</Text>
      )}
      {/* {isFetched &&
        data.length > 0
          ? data.map((token: any) => (
              <TokenCard
                key={token.contract_address}
                name={token?.token?.name}
                symbol={token?.token?.symbol}
                logo_url={token?.token?.thumbnail}
                balance={token?.value}
              />
            ))
          : 'There are no Tokens in this DAO :('} */}
    </Stack>
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
    <Stack direction="horizontal" align="center" justify="space-between">
      <Stack direction="horizontal" align="center">
        {logo_url != null && <Avatar src={logo_url} label="Token LOGO" />}
        <Text>{name}</Text>
      </Stack>
      <Stack direction="horizontal">
        <Text weight="bold">{Number(ethers.utils.formatUnits(balance, decimals)).toFixed(2)}</Text>
        <Text>{symbol}</Text>
      </Stack>
    </Stack>
  )
}
