import { ethers } from 'ethers'
import Image from 'next/image'
import React from 'react'
import { Flex, Text } from '../../../styles/elements'

export default function TokenCard({ token }) {
  console.log('token', token)
  return (
    <Flex css={{
        color: '$foreground',
        justifyContent: 'space-between',
        alignItems: 'center'
    }}>
        <Flex gap="sm" align="center">
            {token.logo != null && <Image src={token.logo} height="32px" width="32px" />}
            <Text>{token.name}</Text>
        </Flex>
        <Flex gap="sm">
            <Text>{ethers.utils.formatUnits(token.balance, token.decimals)}</Text>
            <Text>{token.symbol}</Text>
        </Flex>
    </Flex>
  )
}
