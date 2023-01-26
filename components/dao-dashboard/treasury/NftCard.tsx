import React from 'react'
import { Box, Spinner, Text, Stack, Avatar, Button, IconLink } from '@kalidao/reality'
import { Dialog } from '@design/Dialog/index'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'

export default function NftCard({ nft }: { nft: any }) {
  const url = wrapprUrl(nft.tokenUri)
  const { data, isError } = useQuery(['nftMetadata', nft], () => fetcher(url), {
    enabled: !!nft.tokenUri,
  })

  if (isError) return <Text>An error has occurred.</Text>
  if (!data) return <Spinner />
  console.log('nft', data)
  return (
    <Dialog
      title={data?.['name'] || data?.['title']}
      description={data?.description}
      trigger={
        <Box>
          <Stack direction={'vertical'} align="center">
            <Avatar
              src={data['image'] ? wrapprUrl(data['image']) : wrapprUrl(data['file'])}
              size="64"
              shape="square"
              label="NFT Image"
            />
            <Text weight="bold">{data['name'] || data['title']}</Text>
          </Stack>
        </Box>
      }
    >
      <Stack align="center">
        <Avatar
          src={data['image'] ? wrapprUrl(data['image']) : wrapprUrl(data['file'])}
          size="96"
          shape="square"
          label="NFT Image"
        />
        <Stack space="1" align="center">
          {data['external_url'] && (
            <Button as="a" href={data['external_url']} target="_blank" rel="noopener noreferrer" prefix={<IconLink />}>
              External URL
            </Button>
          )}
        </Stack>
      </Stack>
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
