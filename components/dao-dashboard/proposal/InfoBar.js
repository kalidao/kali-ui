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
        <Box
          css={{
            backgroundColor: '$gray3',
            border: '1px solid $gray4',
            color: '$gray11',
            fontFamily: 'Light',
            padding: '2px 10px',
            borderRadius: '20px',

            '&:hover': {
              backgroundColor: '$gray4',
              border: '1px solid $gray5',
              color: '$gray12',
            },
          }}
        >
          {isFetched ? ensName : truncateAddress(proposal['proposer'])}
        </Box>
      </Link>
    </Flex>
  )
}
