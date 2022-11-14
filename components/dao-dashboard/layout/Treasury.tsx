import { Avatar, Text, Card, Heading, Spinner, Stack, Button, IconArrowRight, IconBookOpen, Stat } from '@kalidao/reality'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { DashboardElementProps } from './types'
import { fetcher } from '@utils/fetcher'
import { ethers } from 'ethers'

const Treasury = ({
  address, 
  chainId
}: DashboardElementProps) => {
  const { data, isLoading, isError } = useQuery(['daoTreasuryDashboard', address, chainId], () => fetcher(`https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_cc2c7c99af324f1b8cbe8c919f9`, {
    method: 'GET',
  }), {
    enabled: !!address && !!chainId
  })

  console.log('data treasury', data?.data?.items)
  return (
    <Card padding="6">
      <Stack>
        <Stack direction={"horizontal"} align="center" justify={"space-between"}>
        <Heading responsive>Treasury</Heading>
        <Link href={`/daos/${chainId}/${address}/treasury`}>
          <Button size="small" variant="transparent"><IconArrowRight /></Button>
        </Link>
        </Stack>
        {isLoading && <Spinner />}
        {isError && <Text>Something went wrong</Text>}
        {data && data?.error === true && <Text>Something went wrong</Text>}
        {data && data?.data?.items?.length > 0 && data?.data?.items?.slice(0, 3).map((item: any) => <Card level="2" padding="3"><Stack direction={"horizontal"} align="center" justify={"space-between"}>
          <Stack direction={"horizontal"} align="center">
          <Avatar src={item?.logo_url} label={`${item?.contract_name} logo`} />
          <Text size="small">{item?.contract_ticker_symbol}</Text>
          </Stack>
          <Text>{parseFloat(ethers.utils.formatUnits(item?.balance, item?.contract_decimals)).toFixed(2)}</Text>
        </Stack></Card>)}
      </Stack>
    </Card>
  )
}

export default Treasury
