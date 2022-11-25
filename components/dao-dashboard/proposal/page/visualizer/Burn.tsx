import { Card, Stack, Text } from '@kalidao/reality'
import { ethers } from 'ethers'

export default function Burn({ accounts, amounts }: { accounts: string[]; amounts: string[] }) {
  for (let i = 0; i < accounts.length; i++) {
    return (
      <Card>
        <Stack>
          <Text>{accounts[i]}</Text>
          <Text>{ethers.utils.formatEther(amounts[i])}</Text>
        </Stack>
      </Card>
    )
  }
}
