import { ethers } from 'ethers'
import { Text, Heading, Stack, Box } from '@kalidao/reality'
import { useContractRead } from 'wagmi'
import { User } from '@components/tools/User'
import { useQuery } from '@tanstack/react-query'
import { getSwapSales } from './getSwapSales'

type Props = {
  chainId: number
  daoAddress: string,
  purchaseMultiplier: string,
  tokenDecimals: number,
  daoSymbol: string,
}
export default function History({ daoAddress, chainId, purchaseMultiplier, tokenDecimals, daoSymbol }: Props) {
  const { data: purchases, error } = useQuery(["swapPurchases", daoAddress, chainId], async () => {
    await getSwapSales(daoAddress, chainId)
  }, {
    enabled: !!daoAddress && !!chainId,
  })

  let multiplier = 1
  if (tokenDecimals < 18) {
    multiplier = Number(ethers.utils.formatUnits(purchaseMultiplier, 18 - tokenDecimals))
  } else {
    multiplier = Number(purchaseMultiplier)
  }

  console.log('purchases', error, purchases, purchaseMultiplier)
  return (
    <Stack>
      <Heading>Past Swaps:</Heading>

      <Box width={'3/4'}>
        <Stack>
          {/* {purchases && !isError &&
            purchases.map((purchase: any, index: number) => (
              <Stack key={index} direction={'horizontal'} justify={'space-between'}>
                <User address={purchase?.purchaser} />
               
               
  
               
                  <Text>
                    {(Number(purchase.purchased) / multiplier).toFixed(2)} {daoSymbol}
                  </Text>
              
              </Stack>
            ))} */}
        </Stack>
      </Box>
    </Stack>
  )
}
