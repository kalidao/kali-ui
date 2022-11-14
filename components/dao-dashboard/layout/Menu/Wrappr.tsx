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
  
  const wrapprLink =
    isSuccess && data
      ? `https://www.wrappr.wtf/${chainId}/${data?.wrappr?.id}/${data?.collectionId}`
      : `https://www.wrappr.wtf/`

  return (
    <a target="_blank" rel="noopenner noreferrer" href={wrapprLink} style={{
      textDecoration: 'none',
    }}>
    <Card padding="6"  shadow hover>
      <Stack direction={'vertical'} align={'center'} justify={'center'}>
      
          <Heading>{uri ? uri?.name : data ? data?.wrappr?.name : 'Wrapprs'}</Heading>
          <Text>{!data && 'Add a legal wrappr to your DAO.'}</Text>
          {/* {!data && <Image src={'/img/wrappr.svg'} height='180' width='180' />} */}
          {<Avatar as="img" size="40" shape="square" label={'Wrappr Logo'} src={uri ? uri.image : '/img/wrappr.svg'} />}
        </Stack>
      
    </Card>
    </a>
  )
}

export default Entity
