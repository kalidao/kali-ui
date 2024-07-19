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

export default function NftCard({ nft }: { nft: any }) {
  const url = wrapprUrl(nft.tokenUri)
  const { data, isError } = useQuery(['nftMetadata', nft], () => fetcher(url), {
    enabled: !!nft.tokenUri,
  })

  if (isError) return <p className="text-red-500">An error has occurred.</p>
  if (!data) return <Spinner />
  console.log('nft', data)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={data['image'] ? wrapprUrl(data['image']) : wrapprUrl(data['file'])} alt="NFT Image" />
              <AvatarFallback>NFT</AvatarFallback>
            </Avatar>
            <p className="font-bold mt-2">{data['name'] || data['title']}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.['name'] || data?.['title']}</DialogTitle>
          <DialogDescription>{data?.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={data['image'] ? wrapprUrl(data['image']) : wrapprUrl(data['file'])} alt="NFT Image" />
            <AvatarFallback>NFT</AvatarFallback>
          </Avatar>
          <div className="mt-4">
            {data['external_url'] && (
              <Button asChild>
                <a href={data['external_url']} target="_blank" rel="noopener noreferrer" className="flex items-center">
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

const wrapprUrl = (url: string) => {
  if (url.includes('https://ipfs.moralis.io:2053/ipfs/')) {
    return url.replace('https://ipfs.moralis.io:2053/ipfs/', 'https://content.wrappr.wtf/ipfs/')
  }
  if (url.includes('ipfs://')) {
    return url.replace('ipfs://', 'https://content.wrappr.wtf/ipfs/')
  }
  if (url.includes('https://content.wrappr.wtf/ipfs/')) {
    return url
  }
  if (url.includes('https://gateway.pinata.cloud/ipfs/')) {
    return url.replace('https://gateway.pinata.cloud/ipfs/', 'https://content.wrappr.wtf/ipfs/')
  }
  return `https://content.wrappr.wtf/ipfs/${url}`
}
