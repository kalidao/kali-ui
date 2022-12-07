import { Avatar, Text, Box } from '@kalidao/reality'
import { useGetWrappr } from '@graph/queries/getWrappr'
import { useQuery } from '@tanstack/react-query'
import { DashboardElementProps } from './types'
import { navItem } from './layout.css'

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
    <a
    target="_blank"
    rel="noopenner noreferrer"
    href={wrapprLink}
    style={{
      textDecoration: 'none',
    }}
  >
    <Box className={navItem} gap="2">
          <Avatar as="img" size="12" shape="square" label={'Wrappr Logo'} src={uri ? uri.image : '/img/wrappr.svg'} />
          <Text>{uri ? uri?.name : data?.wrappr?.name}</Text>
    </Box>
    </a>
  )
}

export default Wrappr
