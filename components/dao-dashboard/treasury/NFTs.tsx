import React from 'react'
import { Stack, Text, Spinner } from '@kalidao/reality'
import NftCard from './NftCard'

export default function NFTs({ nftBalance }: { nftBalance: any[] }) {
  return (
    <Stack direction="horizontal" wrap>
      {nftBalance === undefined && <Spinner />}
      {nftBalance.length > 0 ? (
        nftBalance.map((nft) => <NftCard key={nft.tokenAddress} nft={nft} />)
      ) : (
        <Text>There are no NFTs in this DAO</Text>
      )}
    </Stack>
  )
}
