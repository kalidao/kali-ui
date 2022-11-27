import { useRouter } from 'next/router'
import { erc20ABI, useContractRead } from 'wagmi'
import { ethers } from 'ethers'
import { prettyDate } from '@utils/prettyDate'
import { addresses } from '@constants/addresses'
import { Text, Heading, Stack, Box } from '@kalidao/reality'

export default function Info({ info, decimals, crowdsale, symbol }) {
  const router = useRouter()
  const chainId = Number(router.query.chainId)

  // const [symbol, setSymbol] = useState(null)
  const { data: purchaseTokenSymbol } = useContractRead({
    addressOrName: crowdsale.purchaseAsset,
    contractInterface: erc20ABI,
    functionName: 'symbol',
    chainId: chainId,
  })

  let type = ''
  switch (Number(ethers.utils.formatEther(crowdsale.listId)).toString()) {
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
    (Number(ethers.utils.formatEther(crowdsale.purchaseTotal)) /
      Number(ethers.utils.formatEther(crowdsale.purchaseLimit))) *
    100

  const personalLimit = ethers.utils.formatEther(crowdsale.personalLimit)
  const purchaseLimit = ethers.utils.formatEther(crowdsale.purchaseLimit)

  return (
    <Stack>
      <Heading>Swap Guide</Heading>
      <Box width={'3/4'}>
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Text>Progress: </Text>
          <Text>{progress.toFixed(2)}%</Text>
        </Stack>
      </Box>
      <Box width={'3/4'}>
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Text>Swap Access: </Text>
          <Text>{type}</Text>
        </Stack>
      </Box>
      <Box width={'3/4'}>
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Text>Token to Swap: </Text>
          <a
            href={addresses[chainId]['blockExplorer'] + '/address/' + crowdsale.purchaseAsset}
            target="_blank"
            rel="noreferrer"
          >
            <Text color={'orange'}>{symbol ? symbol.toUpperCase() : 'fetching...'}</Text>
          </a>
        </Stack>
      </Box>
      <Box width={'3/4'}>
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Text># of DAO tokens per {symbol ? symbol.toUpperCase() : 'fetching...'}: </Text>
          <Text>
            {decimals < 18
              ? Number(ethers.utils.formatUnits(crowdsale.purchaseMultiplier, 18 - decimals))
              : Number(ethers.utils.formatUnits(crowdsale.purchaseMultiplier, 'wei'))}
          </Text>
        </Stack>
      </Box>
      <Box width={'3/4'}>
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Text>Individual Swap Limit: </Text>
          <Text>
            {personalLimit} {info?.token?.symbol.toUpperCase()}
          </Text>
        </Stack>
      </Box>
      <Box width={'3/4'}>
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Text>Total Swap Limit: </Text>
          <Text>
            {purchaseLimit} {info?.token?.symbol.toUpperCase()}
          </Text>
        </Stack>
      </Box>
      <Box width={'3/4'}>
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Text>Swap ends on: </Text>
          <Text>{prettyDate(crowdsale.saleEnds)}</Text>
        </Stack>
      </Box>
    </Stack>
  )
}
