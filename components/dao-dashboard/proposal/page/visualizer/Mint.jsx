import { ethers } from 'ethers'
import { Stack, Text } from '@kalidao/reality'

export default function Mint({ accounts, amounts }) {
  for (let i = 0; i < accounts.length; i++) {
    return (
      <Stack direction="horizontal" justify={'space-between'} align="center">
        <Text>{accounts[i]}</Text>
        <Text>{ethers.utils.formatEther(amounts[i])}</Text>
      </Stack>
    )
  }
}
