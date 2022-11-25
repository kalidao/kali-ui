import { ethers } from 'ethers'
import { truncateAddress } from '../../../utils'
import { Text, Heading, Stack, Box } from '@kalidao/reality'

export default function History({ info, crowdsale, decimals, purchasers, symbol }) {
  let multiplier

  if (decimals < 18) {
    multiplier = Number(ethers.utils.formatUnits(crowdsale.purchaseMultiplier, 18 - decimals))
  } else {
    multiplier = crowdsale.purchaseMultiplier
  }

  // console.log(purchasers, crowdsale.purchaseMultiplier)
  return (
    <Stack>
      <Heading>Past Swaps:</Heading>

      <Box width={'3/4'}>
        <Stack>
          {purchasers &&
            purchasers.map((purchaser, index) => (
              <Stack key={index} direction={'horiztontal'} justify={'space-between'}>
                <Box width={'5'}>
                  <Text>{index + 1}.</Text>
                </Box>
                <Box width={'1/3'}>
                  <Text align={'center'}>{truncateAddress(purchaser.purchaser)}</Text>
                </Box>
                <Box width={'1/3'}>
                  <Text align={'right'}>
                    {(Number(purchaser.purchased) / multiplier).toFixed(2)} {symbol}
                  </Text>
                </Box>
              </Stack>
            ))}
        </Stack>
      </Box>
    </Stack>
  )
}
