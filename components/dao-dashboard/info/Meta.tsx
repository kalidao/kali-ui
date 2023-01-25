import React from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { Card, Text, Stack } from '@kalidao/reality'

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
    },
    {
      label: 'Total Supply',
      value: ethers.utils.formatEther(totalSupply),
    },
    {
      label: 'Address',
      value: address,
    },
    {
      label: 'Chain ID',
      value: chainId,
    },
  ]

  return (
    <Card padding="6">
      <Stack>
        {info.map((item, index) => {
          return (
            <Stack key={index} direction={'horizontal'} align="center" justify={'space-between'}>
              <Text>{item.label}</Text>
              <Text weight="bold">{item.value}</Text>
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
}
