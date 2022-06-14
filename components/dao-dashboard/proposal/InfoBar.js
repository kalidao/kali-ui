import React from 'react'
import { Flex, Box } from '../../../styles/elements'
import { truncateAddress } from './../../../utils/'
import { useEnsName } from 'wagmi'
import Link from 'next/link'
export default function InfoBar({ proposal }) {
  const {
    data: ensName,
    isError,
    isLoading,
    isFetched,
  } = useEnsName({
    address: proposal && proposal['proposer'],
    chainId: Number(1),
  })

  return (
    <Flex>
      <Link href={`/users/${encodeURIComponent(proposal && proposal['proposer'])}`}>
        <Box variant="id">{isFetched ? ensName : truncateAddress(proposal['proposer'])}</Box>
      </Link>
    </Flex>
  )
}
