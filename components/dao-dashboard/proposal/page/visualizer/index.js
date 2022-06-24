import { ethers } from 'ethers'
import React from 'react'
import { Flex, Text } from '../../../../../styles/elements'
import { truncateAddress } from '../../../../../utils'

export default function Visualizer({ proposal }) {
  const Mint = () => {
    for (let i = 0; i < proposal?.accounts; i++) {
      return (
        <Flex gap="md">
          <Text as="a" href={`https://app.kali.gg/users/${proposal?.accounts[i]}`}>
            {truncateAddress(proposal?.accounts[i])}
          </Text>
          <Text>{ethers.utils.formatEther(proposal?.amounts[i])}</Text>
        </Flex>
      )
    }
  }
  return (
    <>
      {proposal?.proposalType === 'MINT' && (
        <Flex
          dir="col"
          gap="md"
          css={{
            border: '1px solid $gray6',
            borderRadius: '20px',
            padding: '1rem',
          }}
        >
          <Flex
            as="h3"
            css={{
              fontFamily: 'Regular',
              fontWeight: '600',
              fontSize: '16px',
              color: '$gray12',
            }}
          >
            MINTING
          </Flex>
          <Mint />
        </Flex>
      )}
    </>
  )
}
