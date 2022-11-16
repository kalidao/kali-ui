import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Text, Button, Card, Heading, Stack, IconArrowRight } from '@kalidao/reality'
import { useGetWrappr } from '@graph/queries/getWrappr'
import { useQuery } from '@tanstack/react-query'
import { DashboardElementProps } from './types'

const Wrappr = ({ address, chainId }: DashboardElementProps) => {
  const { data, error, isSuccess, isLoading } = useGetWrappr(Number(chainId), address)
  const tokenURI = data?.uri ? data?.uri : data?.wrappr?.baseURI
  const {
    data: uri,
    error: uriError,
    isLoading: isLoadingURI,
  } = useQuery(
    ['uri', data],
    async () => {
      const res = await fetch(tokenURI)
      const data = await res.json()
      return data
    },
    {
      enabled: data !== undefined ? true : false,
    },
  )

  if (!data) {
    return null
  }

  const wrapprLink =
    isSuccess && data
      ? `https://www.wrappr.wtf/${chainId}/${data?.wrappr?.id}/${data?.collectionId}`
      : `https://www.wrappr.wtf/`

  return (
    <Card padding="6" shadow hover>
      <a
        target="_blank"
        rel="noopenner noreferrer"
        href={wrapprLink}
        style={{
          textDecoration: 'none',
        }}
      >
        <Stack direction={'vertical'} align={'center'} justify={'center'} space="3">
          <Heading>{uri ? uri?.name : data?.wrappr?.name}</Heading>
          <Avatar as="img" size="40" shape="square" label={'Wrappr Logo'} src={uri ? uri.image : '/img/wrappr.svg'} />
        </Stack>
      </a>
    </Card>
  )
}

export default Wrappr
