import React from 'react'
import { Stack, Text, Spinner } from '@kalidao/reality'
import NftCard from './NftCard'
import { useRouter } from 'next/router'
import { useGetAccountNFT } from '@components/hooks/useGetAccountNFT'

export default function NFTs() {
  const { chainId, dao } = useRouter().query
  const { data, isLoading, isError } = useGetAccountNFT(parseInt(chainId as string), dao as string)

  return (
    <Stack direction="horizontal" wrap>
      {isLoading && <Spinner />}
      {isError && <Text>There was an error loading the NFTs</Text>}
      {data && data.assets.length > 0 ? (
        data.assets.map((nft: any) => <NftCard key={nft.contractAddress} NFT={nft} />)
      ) : (
        <Text>There are no NFTs in this DAO</Text>
      )}
    </Stack>
  )
}
