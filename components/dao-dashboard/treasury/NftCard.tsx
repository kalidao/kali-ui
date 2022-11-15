import React, { useEffect } from 'react'
import Image from 'next/image'
import { Flex, Box, Text } from '../../../styles/elements'
import { Spinner } from '../../elements'
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle } from '../../../styles/Dialog'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'

export default function NftCard({ nft }: {
  nft: any
}) {
  
  const url = wrapprUrl(nft.tokenUri)
  console.log('nft', nft.name, nft.tokenUri, url)
  const { data, isLoading, isError, error } = useQuery(['nftMetadata', nft], () => fetcher(url), {
    enabled: !!nft.tokenUri,
  })

  if (isError) return <Text>An error has occurred.</Text>
  if (!data) return <Spinner />

  console.log('nftMeta', data)
  return (
    <Dialog>
      <DialogTrigger>
        {data ? (
          <Flex
            css={{
              height: '300px',
              width: '250px',
              background: '$gray2',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '20px',
              overflow: 'hidden',

              '&:hover': {
                boxShadow: '2px 2px 10px -1px hsl(252, 87.0%, 96.4%)',
              },
            }}
          >
            <Image
              src={data['image'] ? data['image'] : 'https://ipfs.io/ipfs/' + data['file']}
              height="250px"
              width="250px"
              alt="NFT Image"
            />
            <Text
              css={{
                color: '$gray11',
                fontFamily: 'Bold',
                fontWeight: '500',
                fontSize: '16px',
                marginBottom: '1rem',
              }}
            >
              {data['name'] || data['title']}
            </Text>
          </Flex>
        ) : (
          <Spinner />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogClose  />
        <DialogTitle
          css={{
            fontFamily: 'Bold',
          }}
        >
          {data['name'] || data['title']}
        </DialogTitle>
        <Flex
          css={{
            padding: '1rem',
            gap: '0.5rem',
          }}
        >
          <Image
            src={ data['image'] ? wrapprUrl(data['image']) : wrapprUrl(data['file'])}
            height="100%"
            width="100%"
            alt="NFT Image"
          />
          <Flex gap="sm" dir="col" align="separate">
            <Text
              css={{
                fontFamily: 'Regular',
              }}
            >
              {data['description']}
            </Text>
            {data['external_url'] && (
              <Text
                as="a"
                css={{
                  fontFamily: 'Regular',
                  color: '$amber11',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '0.2rem',
                }}
                href={data['external_url']}
                target="_blank"
              >
                External URL
                <ExternalLinkIcon />
              </Text>
            )}
          </Flex>
        </Flex>
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
  return `https://content.wrappr.wtf/ipfs/${url}`
}