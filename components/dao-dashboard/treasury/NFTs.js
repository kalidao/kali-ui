import React from 'react'
import { Flex } from "../../../styles/elements";
import NftCard from "./NftCard";

export default function NFTs({ nftBalance }) {
  console.log('nftBalance', nftBalance)
  return (
    <Flex>
      {nftBalance && nftBalance.map(nft => <NftCard key={nft.token_address} nft={nft}/>)}
    </Flex>
  )
}
