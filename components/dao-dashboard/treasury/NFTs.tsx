import React from 'react'
import NftCard from './NftCard'
import { Spinner } from '@components/ui/spinner'
import { Address } from 'viem'
import { useNFTs } from 'hooks/use-nfts'

interface NFTsProps {
  address: Address
  chainId: number
}

export default function NFTs({ address, chainId }: NFTsProps) {
  const { data: nftBalance } = useNFTs(address)

  return (
    <div className="flex flex-wrap gap-4">
      {nftBalance === undefined && <Spinner />}
      {nftBalance && nftBalance.length > 0 ? (
        nftBalance.map((nft) => <NftCard key={nft.contractAddress + nft.tokenId} nft={nft} />)
      ) : (
        <p className="text-sm text-gray-500">There are no NFTs in this DAO</p>
      )}
    </div>
  )
}
