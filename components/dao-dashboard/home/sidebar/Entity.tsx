import Link from 'next/link'
import { Avatar, Button, Card, Heading, Stack, IconArrowRight } from '@kalidao/reality'
import { useGetWrappr } from '@graph/queries/getWrappr'
import { useQuery } from '@tanstack/react-query'

type Props = {
  address: string
  chainId: string
}

const Entity = ({ address, chainId }: Props) => {
  const { data, error, isLoading } = useGetWrappr(Number(chainId), address)
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

  console.log('wrappr', error, isLoading, data)
  console.log('uri', tokenURI, uriError, isLoadingURI, uri)

  return (
    <Card padding="8" width="112" borderRadius={'large'} shadow hover>
      <Stack direction={'horizontal'} align="flex-end" justify={'flex-end'}>
        <Stack align="flex-start" justify={'flex-start'} as="a">
          <Heading>{uri ? uri?.name : data?.wrappr?.name}</Heading>
          <Avatar as="img" size="40" shape="square" label={'Wrappr Logo'} src={uri ? uri.image : ''} />
        </Stack>
        <Button
          as="a"
          shape="circle"
          variant="secondary"
          tone="blue"
          href={`https://www.wrappr.wtf/${chainId}/${data?.wrappr?.id}/${data?.collectionId}`}
          target="_blank"
          rel="nooppener noreferrer"
        >
          <IconArrowRight />
        </Button>
      </Stack>
    </Card>
  )
}

export default Entity
