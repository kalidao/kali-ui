import React from 'react'
import { Flex } from '../../../styles/elements'
import { Spinner } from '../../elements'
import NftCard from './NftCard'

export default function NFTs({ nftBalance }: { nftBalance: any[] }) {
  console.log('nftBalance', nftBalance)
  return (
    <Flex>
      {nftBalance ? (
        nftBalance.length > 0 ? (
          nftBalance.map((nft) => <NftCard key={nft.tokenAddress} nft={nft} />)
        ) : (
          'There are no NFTs in this DAO :('
        )
      ) : (
        <Spinner />
      )}
    </Flex>
  )
}
