import React from 'react'
import { Box, Spinner, Text, Stack, Avatar, Button, IconLink } from '@kalidao/reality'
import { Dialog } from '@design/Dialog/index'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'

export default function NftCard({ NFT }: any) {
  const { data, isLoading, isError } = useQuery(
    ['nft', NFT?.contractAddress, NFT?.token_id],
    () => fetcher(NFT.tokenUrl),
    {
      enabled: !!NFT?.tokenUrl,
    },
  )

  return (
    <Dialog
      title={NFT?.name}
      description={data?.description}
      trigger={
        <Box>
          <Stack direction={'vertical'} align="center">
            <Avatar src={NFT?.imageUrl} size="64" shape="square" label="NFT Image" />
            <Text weight="bold">{NFT?.name}</Text>
          </Stack>
        </Box>
      }
    >
      <Stack align="center">
        <Avatar src={NFT?.imageUrl} size="96" shape="square" label="NFT Image" />
      </Stack>
    </Dialog>
  )
}
