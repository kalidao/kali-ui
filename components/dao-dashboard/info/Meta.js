import React from 'react'
import { useRouter } from 'next/router';
import { Flex, Text } from '../../../styles/elements'
import { ethers } from 'ethers';

export default function Meta({ info }) {
  const router = useRouter();

  return (
    <Flex gap="md" dir="col" css={{
        border: '1px solid $gray800',
        padding: '1rem'
      }}>
        <Flex gap="md" align="separate">
          <Text>Name</Text>
          <Text>{info["token"]["name"]}</Text>
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Symbol</Text>
          <Text>{info["token"]["symbol"]}</Text>
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Total Supply</Text>
          <Text>{ethers.utils.formatUnits(info["token"]["totalSupply"], 18)}</Text>
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Contract Address</Text>
          <Text>{info["id"]}</Text>
          {/* TODO: Add etherscan link */}
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Network</Text>
          <Text>{router.query.chainId}</Text>
        </Flex>
    </Flex>
  )
}
