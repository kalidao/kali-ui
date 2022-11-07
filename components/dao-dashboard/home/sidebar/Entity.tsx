import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Text, Button, Card, Heading, Stack, IconArrowRight } from '@kalidao/reality'
import { useGetWrappr } from '@graph/queries/getWrappr'
import { useQuery } from '@tanstack/react-query'

type Props = {
  address: string
  chainId: string
}

const Entity = ({ address, chainId }: Props) => {
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

  console.log('wrappr', error, isLoading, data)
  console.log('uri', tokenURI, uriError, isLoadingURI, uri)

  const wrapprLink =
    isSuccess && data
      ? 'https://www.wrappr.wtf/${chainId}/${data?.wrappr?.id}/${data?.collectionId}'
      : 'https://www.wrappr.wtf/'

  return (
    <Card padding="8" width="112" borderRadius={'large'} shadow hover>
      <Stack direction={'horizontal'} align={'flex-end'} justify={'space-between'}>
        <Stack align="flex-start" justify={'flex-start'} as="a">
          <Heading>{uri ? uri?.name : data ? data?.wrappr?.name : 'Wrapprs'}</Heading>
          <Text>{!data && 'Add a legal wrappr to your DAO.'}</Text>
          {/* {!data && <Image src={'/img/wrappr.svg'} height='180' width='180' />} */}
          {<Avatar as="img" size="40" shape="square" label={'Wrappr Logo'} src={uri ? uri.image : '/img/wrappr.svg'} />}
        </Stack>
        <Button
          as="a"
          shape="circle"
          variant="secondary"
          tone="blue"
          href={wrapprLink}
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
