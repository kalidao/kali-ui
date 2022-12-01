import { useRouter } from 'next/router'
import { erc20ABI, useContractRead } from 'wagmi'
import { ethers } from 'ethers'
import { prettyDate } from '@utils/prettyDate'
import { addresses } from '@constants/addresses'
import { Text, Heading, Stack, Box, Card, Divider } from '@kalidao/reality'
import { getSwapRatio } from './utils'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'

type Info = {
  swap?: any
  tokenDecimals: number
  tokenSymbol: string
  daoSymbol: string
}

export default function Info({ swap, tokenDecimals, tokenSymbol, daoSymbol }: Info) {
  const router = useRouter()
  const chainId = Number(router.query.chainId)
  
  if (!swap) return null

  let type = ''
  switch (swap?.listId?.toString()) {
    case '0':
      type = 'Public'
      break
    case '1':
      type = 'Accredited Investors'
      break
    default:
      type = 'Private'
      break
  }
  let progress = 0
  progress =
    swap &&
    (Number(ethers.utils.formatEther(swap?.purchaseTotal)) / Number(ethers.utils.formatEther(swap?.purchaseLimit))) *
      100

  const personalLimit = swap && ethers.utils.formatEther(swap?.personalLimit)
  const purchaseLimit = swap && ethers.utils.formatEther(swap?.purchaseLimit)

  const rows = [
    {
      label: 'Progress:',
      content: <Text>{progress.toFixed(2)}%</Text>,
    },
    {
      label: 'Swap Access:',
      content: <Text>{type}</Text>,
    },
    {
      label: 'Token to Swap:',
      content: (
        <Box
          as="a"
          color="accent"
          href={getExplorerLink(chainId, ExplorerType.ADDRESS, swap?.purchaseAsset)}
          target="_blank"
          rel="noreferrer"
        >
          {tokenSymbol ? tokenSymbol?.toUpperCase() : 'fetching...'}
        </Box>
      ),
    },
    {
      label: `Number of DAO tokens per ${tokenSymbol ? tokenSymbol?.toUpperCase() : 'fetching...'}:`,
      content: (
        <Text>
          {getSwapRatio(swap.purchaseMultiplier, tokenDecimals)} {daoSymbol?.toUpperCase()}
        </Text>
      ),
    },
    {
      label: 'Individual Swap Limit:',
      content: (
        <Text>
          {personalLimit} {daoSymbol?.toUpperCase()}
        </Text>
      ),
    },
    {
      label: 'Total Swap Limit:',
      content: (
        <Text>
          {purchaseLimit} {daoSymbol?.toUpperCase()}
        </Text>
      ),
    },
    {
      label: 'Ends On:',
      content: <Text>{prettyDate(new Date(swap?.saleEnds * 1000))}</Text>,
    },
  ]

  return (
    <Card padding="6">
      <Stack>
        <Heading>Swap Guide</Heading>
        <Divider />
        {rows.map((row, i) => {
          return (
            <Row key={i} label={row.label}>
              {row.content}
            </Row>
          )
        })}
      </Stack>
    </Card>
  )
}

export const Row = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <Stack direction={'horizontal'} justify={'space-between'}>
      <Text>{label}</Text>
      <Box fontWeight={'semiBold'}>{children}</Box>
    </Stack>
  )
}
