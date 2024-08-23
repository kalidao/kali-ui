import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'

type Blockchain = 'eth' | 'arbitrum' | 'gnosis' | 'base' | 'optimism' | 'polygon'

export interface NFT {
  blockchain: string
  collectionName: string
  contractAddress: string
  contractType: number
  imageUrl: string
  name: string
  quantity: string
  symbol: string
  tokenId: string
  tokenUrl: string
  traits: Array<{
    bunny_id: string
    count: number
    display_type: string
    frequency: string
    mp_score: string
    rarity: string
    trait_type: string
    value: string
  }>
}

interface GetNFTsParams {
  blockchain: Blockchain[]
  walletAddress: string
  pageSize: number
  pageToken: string
  filter?: Array<Record<string, string[]>>
}

const fetchNFTs = async (params: GetNFTsParams): Promise<NFT[]> => {
  const response = await fetch('https://rpc.ankr.com/multichain', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'ankr_getNFTsByOwner',
      params: params,
      id: 1,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return data.result.assets
}

export const useNFTs = (owner: Address) => {
  return useQuery<NFT[], Error>(
    ['nfts', owner],
    () =>
      fetchNFTs({
        blockchain: ['eth', 'arbitrum', 'gnosis', 'base', 'optimism', 'polygon'],
        walletAddress: owner,
        pageSize: 100,
        pageToken: '',
      }),
    {
      enabled: !!owner,
    },
  )
}
