import React from 'react'
import { Box, Flex, Text } from '../../../styles/elements'
import { truncateAddress } from '../../../utils/formatters'
import { useBalance, useEnsName } from 'wagmi'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { ethers } from 'ethers'

export default function VoteCard({ vote }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data: ensName } = useEnsName({
    address: vote.voter,
    chainId: 1,
  })

  const { data: balance } = useBalance({
    addressOrName: vote.voter,
    token: daoAddress ? daoAddress : AddressZero,
    chainId: Number(daoChain),
  })

  console.log('balance', daoAddress, daoChain)
  return (
    <Flex
      gap="md"
      css={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        css={{
          maxWidth: '30px',
        }}
      >
        {ensName ? ensName : truncateAddress(vote.voter)}
      </Text>
      <Text
        css={{
          maxWidth: '5px',
        }}
      >
        {vote.vote === true ? <CheckIcon color="green" /> : <Cross2Icon color="red" />}
      </Text>
      <Flex
        gap="sm"
        css={{
          maxWidth: '100px',
        }}
      >
        <Text>{balance?.formatted}</Text>
        <Text>{balance?.symbol}</Text>
      </Flex>
    </Flex>
  )
}
