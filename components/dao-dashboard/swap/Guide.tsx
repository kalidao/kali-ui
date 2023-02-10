import { Progress } from '@design/Progress'
import { Card, Stack, Text, Heading, Divider } from '@kalidao/reality'
import { prettyDate } from '@utils/prettyDate'
import { ethers } from 'ethers'
import { useSwapStore } from './store'
import { getSwapRate } from './utils'

export default function Guide() {
  const swap = useSwapStore((state) => state.swap)
  const token = useSwapStore((state) => state.token)
  const dao = useSwapStore((state) => state.dao)

  const guide = [
    {
      label: 'Access',
      value: swap.listId != 0 ? 'Private' : 'Public',
    },
    {
      label: 'Swap Rate',
      value: `${Number(getSwapRate(token.decimals, swap.purchaseMultiplier)).toFixed(2)} ${token.symbol} for 1 ${
        dao.symbol
      }`,
    },
    {
      label: 'Personal Limit',
      value: ethers.utils.formatEther(swap.personalLimit),
    },
    {
      label: 'Total Limit',
      value: ethers.utils.formatEther(swap.purchaseLimit),
    },
    {
      label: 'Swap Ends',
      value: prettyDate(new Date(swap.saleEnds * 1000)),
    },
  ]

  const progress = ((swap.saleEnds * 1000 - Date.now()) / (swap.saleEnds * 1000)) * 100

  return (
    <Card padding="6">
      <Stack>
        <Heading>Guide</Heading>
        <Progress value={progress} />
        <Divider />
        {guide.map((item) => (
          <Stack key={item.label} direction="horizontal" align="center" justify={'space-between'}>
            <Text>{item.label}</Text>
            <Text weight={'bold'}>{item.value}</Text>
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}
