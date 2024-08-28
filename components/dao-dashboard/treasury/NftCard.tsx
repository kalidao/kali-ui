import React from 'react'
import { Spinner } from '@components/ui/spinner'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { Link } from 'lucide-react'
import { AspectRatio } from '@components/ui/aspect-ratio'

export declare type Blockchain =
  | 'arbitrum'
  | 'avalanche'
  | 'bsc'
  | 'eth'
  | 'fantom'
  | 'polygon'
  | 'syscoin'
  | 'optimism'

export interface Attribute {
  trait_type?: string
  value?: string
  display_type?: string
  bunny_id?: string
  count?: number
  frequency?: string
  mp_score?: string
  rarity?: string
}
export interface Nft {
  blockchain: Blockchain
  name: string
  tokenId: string
  tokenUrl: string
  imageUrl: string
  collectionName: string
  symbol: string
  contractType: 'ERC721' | 'ERC1155' | 'UNDEFINED'
  contractAddress: string
  quantity?: string
  traits?: Attribute[]
}

export default function NftCard({ nft }: { nft: Nft }) {
  const url = wrapprUrl(nft.tokenUrl)
  const { data, isError } = useQuery(['nftMetadata', url], () => fetcher(url), {
    enabled: !!nft.tokenUrl,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer m-2">
          <div className="flex flex-col items-center">
            <div className="w-[200px]">
              <AspectRatio ratio={1 / 1}>
                {nft.imageUrl ? (
                  <img
                    src={wrapprUrl(nft.imageUrl)}
                    alt="NFT Image"
                    className="rounded-md object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement?.classList.add(
                        'bg-gradient-to-br',
                        'from-purple-400',
                        'to-blue-500',
                      )
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 rounded-md" />
                )}
              </AspectRatio>
            </div>
            <p className="font-bold mt-2">{nft.name}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{nft.collectionName}</DialogTitle>
          <DialogDescription>{nft.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <div className="w-[200px]">
            <AspectRatio ratio={1 / 1}>
              <img src={wrapprUrl(nft.imageUrl)} alt="NFT Image" className="object-cover" />
            </AspectRatio>
          </div>
          <div className="mt-4">
            {data?.['external_url'] && (
              <Button asChild>
                <a
                  href={data?.['external_url']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Link className="mr-2" size={16} />
                  External URL
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const wrapprUrl = (url: string): string => {
  // Regular expression to match IPFS hash
  const ipfsHashRegex =
    /(?:ipfs:\/\/|https:\/\/(?:ipfs\.moralis\.io:2053\/ipfs\/|gateway\.pinata\.cloud\/ipfs\/))([a-zA-Z0-9]{46})/

  const match = url.match(ipfsHashRegex)

  if (match) {
    // Extract the IPFS hash
    const ipfsHash = match[1]
    return `https://content.wrappr.wtf/ipfs/${ipfsHash}`
  }

  // If the URL is already using the Wrappr resolver, return it as is
  if (url.startsWith('https://content.wrappr.wtf/ipfs/')) {
    return url
  }

  // For all other cases, return the URL as is
  return url
}
