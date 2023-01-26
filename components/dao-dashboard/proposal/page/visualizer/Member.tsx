import { ethers } from 'ethers'
import { Stack, Text } from '@kalidao/reality'
import { User } from '@components/tools/User'

interface MemberProps {
  id: number
  account: string
  amount: string
}

export default function Member({ accounts, amounts }: { accounts: string[]; amounts: any }) {
  let rows: MemberProps[] = []
  for (let i = 0; i < accounts.length; i++) {
    rows.push({ id: i, account: accounts[i], amount: amounts[i] })
  }

  return (
    <Stack>
      <Stack direction="horizontal" justify={'space-between'} align="center">
        <Text variant="label">User</Text>
        <Text variant="label">Amount</Text>
      </Stack>
      {rows.map((row) => (
        <Row key={row.id} account={row.account} amount={row.amount} />
      ))}
    </Stack>
  )
}

const Row = ({ account, amount }: { account: string; amount: any }) => {
  return (
    <Stack direction="horizontal" justify={'space-between'} align="center">
      <User address={account} />
      <Text>{ethers.utils.formatEther(amount)}</Text>
    </Stack>
  )
}
