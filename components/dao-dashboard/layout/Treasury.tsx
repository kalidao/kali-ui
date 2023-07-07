import { useMemo } from 'react'
import { Avatar, Box, Tag, Text, Card, Heading, Spinner, Stack, Button, IconBookOpen } from '@kalidao/reality'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { DashboardElementProps } from './types'
import { fetcher } from '@utils/fetcher'
import { ethers } from 'ethers'
import { prettyDate } from '@utils/prettyDate'

const Treasury = ({ address, chainId }: DashboardElementProps) => {
  const { data, isLoading, isError } = useQuery(
    ['daoTreasuryDashboard', address, chainId],
    () =>
      fetcher(
        `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
        {
          method: 'GET',
        },
      ),
    {
      enabled: !!address && !!chainId,
    },
  )

  const totalBalance = useMemo(
    () =>
      data?.data?.items?.reduce((acc: number, item: any) => {
        
        return (
          acc +
          parseFloat(ethers.utils.formatUnits(item?.balance, item?.contract_decimals)) * parseFloat(item?.quote_rate)
        )
      }, 0),
    [data],
  )

  

  const lastUpdated = data?.data?.updated_at ? `Last updated ${prettyDate(new Date(data?.data?.updated_at))}` : null

  return (
    <Card padding="6">
      <Box display="flex" flexDirection={'column'} justifyContent={'space-between'} height="full">
        <Stack>
          <Stack direction={'horizontal'} align="center" justify={'space-between'}>
            <Heading responsive>Treasury</Heading>
            {data && data?.error !== true && (
              <Tag size="medium" tone="green" label="$">
                {chainId === 5 ? '🤪' : totalBalance.toFixed(2)}
              </Tag>
            )}
          </Stack>
          {isLoading && <Spinner />}
          {isError && <Text>Something went wrong</Text>}
          {data && data?.error === true && <Text>Something went wrong</Text>}
          {data &&
            data?.data?.items?.length > 0 &&
            data?.data?.items?.slice(0, 3).map((item: any) => (
              <Card key={item?.contract_address} padding="2">
                <Stack direction={'horizontal'} align="center" justify={'space-between'}>
                  <Stack direction={'horizontal'} align="center">
                    <Avatar size="8" src={item?.logo_url} label={`${item?.contract_name} logo`} />
                    <Text size="small">{item?.contract_ticker_symbol}</Text>
                  </Stack>
                  <Text>{parseFloat(ethers.utils.formatUnits(item?.balance, item?.contract_decimals)).toFixed(2)}</Text>
                </Stack>
              </Card>
            ))}
        </Stack>
        <Stack direction={'horizontal'} align="center">
          <Link href={`/daos/${chainId}/${address}/treasury`} passHref>
            <Button shape="circle" size="small" as="a" variant="transparent">
              <IconBookOpen />
            </Button>
          </Link>
          <Text size="label" color="foregroundSecondary">
            {lastUpdated}
          </Text>
        </Stack>
      </Box>
    </Card>
  )
}

export default Treasury
