import React, { useEffect } from 'react'
import Image from 'next/image'
import { chainId } from 'wagmi'
import { useMoralisWeb3Api } from 'react-moralis'
import useSWR from 'swr'
import { Flex, Box, Text } from '../../../styles/elements'
import { Spinner } from '../../elements/'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function NftCard({ nft }) {
  console.log('nft', nft)
  const { data, error } = useSWR(nft.token_uri, fetcher)

  if (error) return 'An error has occurred.'
  if (!data) return 'Loading...'

  console.log('nftMeta', data)
  return (
    <Flex>
      {data ? (
        <Box
          css={{
            height: '150px',
            width: '150px',
          }}
        >
          <Image src={data['image']} height="100%" width="100%" alt="NFT Image" />
        </Box>
      ) : (
        <Spinner />
      )}
    </Flex>
  )
}
