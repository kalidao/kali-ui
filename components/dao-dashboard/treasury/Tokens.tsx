import React from 'react'
import { ethers } from 'ethers'
import Image from 'next/image'
import { Skeleton, Box, Text, Stack, Avatar } from '@kalidao/reality'

// TODO: Typechecking
type Props = {
  tokenBalance: any
}

export default function Tokens({ tokenBalance }: Props) {
  console.log('tokens', tokenBalance)
  return (
    <Skeleton>
      <Box>
        {tokenBalance &&
          (tokenBalance.length > 0
            ? tokenBalance.map((token: any) => <TokenCard key={token.token.contractAddress} token={token} />)
            : 'There are no Tokens in this DAO :(')}
      </Box>
    </Skeleton>
  )
}

type TokenProps = {
  token: any
}

function TokenCard({ token }: TokenProps) {
  return (
    <Stack direction="horizontal" align="center" justify="space-between">
      <Stack direction="horizontal" align="center">
        {token.token.logo != null && <Avatar src={token.token.logo} label="Token LOGO" />}
        <Text>{token.token.name}</Text>
      </Stack>
      <Stack direction="horizontal">
        <Text weight="bold">{token.value}</Text>
        <Text>{token.token.symbol}</Text>
      </Stack>
    </Stack>
  )
}
