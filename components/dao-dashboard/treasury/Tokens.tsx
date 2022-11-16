import React from 'react'
import { ethers } from 'ethers'
import { Skeleton, Text, Stack, Avatar } from '@kalidao/reality'

// TODO: Typechecking
type Props = {
  tokens: any[]
}

export default function Tokens({ tokens }: Props) {
  console.log('tokens', tokens)
  return (
    <Stack>
      <></>
      {tokens &&
        (tokens.length > 0
          ? tokens.map((token: any) => (
              <TokenCard
                key={token.contract_address}
                name={token?.token?.name}
                symbol={token?.token?.symbol}
                logo_url={token?.token?.thumbnail}
                balance={token?.value}
              />
            ))
          : 'There are no Tokens in this DAO :(')}
    </Stack>
  )
}

type TokenProps = {
  name: string
  symbol: string
  logo_url: string
  balance: string
}

function TokenCard({ name, symbol, logo_url, balance }: TokenProps) {
  return (
    <Stack direction="horizontal" align="center" justify="space-between">
      <Stack direction="horizontal" align="center">
        {logo_url != null && <Avatar src={logo_url} label="Token LOGO" />}
        <Text>{name}</Text>
      </Stack>
      <Stack direction="horizontal">
        <Text weight="bold">{balance}</Text>
        <Text>{symbol}</Text>
      </Stack>
    </Stack>
  )
}
