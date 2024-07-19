import { useGetWrappr } from '@graph/queries/getWrappr'
import { useQuery } from '@tanstack/react-query'
import { DashboardElementProps } from './types'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

const Wrappr = ({ address, chainId }: DashboardElementProps) => {
  const { data, isSuccess } = useGetWrappr(Number(chainId), address)
  const tokenURI = data?.uri ? data?.uri : data?.wrappr?.baseURI
  const { data: uri } = useQuery(
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
      <div className={'space-x-2'}>
        <Avatar>
          <AvatarImage src={uri ? uri.image : '/img/wrappr.svg'} />
          <AvatarFallback>{data?.wrappr?.name}</AvatarFallback>
        </Avatar>
        <p>{uri ? uri?.name : data?.wrappr?.name}</p>
      </div>
    </a>
  )
}

export default Wrappr
