import React from 'react'
import { Flex, Box } from '../../../styles/elements'
import { truncateAddress } from './../../../utils/'
import { useEnsName } from 'wagmi'
import Link from 'next/link'

export default function InfoBar({ proposal }) {
  const {
    data: ensName,
    isLoading,
    isFetched,
    isError,
  } = useEnsName({
    address: proposal && proposal['proposer'],
    chainId: 1,
  })

  return (
    <Flex>
      <Link href={`/users/${encodeURIComponent(proposal && proposal['proposer'])}`}>
        <Box variant="id">
          {/* TODO: Make this something else. Adding fallbacks for now umm */}
          {isLoading && truncateAddress(proposal['proposer'])}
          {isError && truncateAddress(proposal['proposer'])}
          {ensName === null && truncateAddress(proposal['proposer'])}
          {isFetched && ensName}
        </Box>
      </Link>
    </Flex>
  )
}
