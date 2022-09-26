import React from 'react'
import { ethers } from 'ethers'
import Image from 'next/image'
import { Skeleton, Box, Text, Stack } from '@kalidao/reality'

// TODO: Typechecking
type Props = {
  tokenBalance: any
}

export default function Tokens({ tokenBalance }: Props) {
  return (
    <Skeleton>
      <Box>
        {tokenBalance && (
          tokenBalance.length > 0 ? (
            tokenBalance.map((token: any) => <TokenCard key={token.token_address} token={token} />)
          ) : (
            'There are no Tokens in this DAO :('
          )
        )}
      </Box>
    </Skeleton>
  )
}

type TokenProps = {
  token: any
}

function TokenCard({ token }: TokenProps) {
  return (
    <Stack
    >
      <Stack>
        {token.logo != null && <Image src={token.logo} height="32px" width="32px" alt="Token LOGO" />}
        <Text>{token.name}</Text>
      </Stack>
      <Stack>
        <Text>{ethers.utils.formatUnits(token.balance, token.decimals)}</Text>
        <Text>{token.symbol}</Text>
      </Stack>
    </Stack >
  )
}