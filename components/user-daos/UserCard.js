import React, { useEffect } from 'react'
import { styled } from '../../styles/stitches.config'
import { truncateAddress } from '../../utils'
import { Flex, Box, Text } from '../../styles/elements'
import { useNetwork, useEnsName, useAccount } from 'wagmi'
import { getRandomEmoji } from '../../utils'

const Name = styled('div', {
  fontFamily: 'Bold',
})

const Address = styled('div', {
  fontFamily: 'Screen',
})

// disable when not active chain
export default function UserCard({ dao, chain }) {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const { data: ensName, isLoading } = useEnsName({
    address: account.address,
    chainId: activeChain.id,
  })

  useEffect(() => {
    console.log(ensName)
  }, [ensName])

  return (
    <Box as="a" variant="profile">
      <Box
        css={{
          background: '$gray9',
          borderRadius: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '30px',
          width: '30px',
        }}
      >
        {getRandomEmoji('0x123334423902309390230943')}
      </Box>
      <Flex dir="col" gap="sm">
        {ensName ? <Text>{ensName}</Text> : <Text>{truncateAddress(account.address)}</Text>}
        <Text>Hi</Text>
        <Text>Hi</Text>
      </Flex>
    </Box>
  )
}
