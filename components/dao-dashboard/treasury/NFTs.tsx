import React from 'react'
import NftCard from './NftCard'
import { Spinner } from '@components/ui/spinner'
import { Address } from 'viem'
import { useNFTsByOwner } from 'ankr-react'

interface NFTsProps {
  address: Address
  chainId: number
}

export default function NFTs({ address, chainId }: NFTsProps) {
  const { data, isLoading, error } = useNFTsByOwner({
    walletAddress: address,
  })

  return (
    <div className="flex">
      {isLoading ? (
        <Spinner />
      ) : data && data.assets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.assets.map((nft) => (
            <NftCard key={nft.contractAddress + nft.tokenId} nft={nft} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">There are no NFTs in this DAO</p>
      )}
      {error ? <p className="text-sm text-red-500">Error loading NFTs</p> : null}
    </div>
  )
}
