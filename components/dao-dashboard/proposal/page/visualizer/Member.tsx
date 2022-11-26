import { ethers } from 'ethers'
import { Avatar, IconEth, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '@utils/truncateAddress'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const chainId = Number(router.query.chainId)

  return (
    <Stack>
      <Stack direction="horizontal" justify={'space-between'} align="center">
        <Text variant="label">User</Text>
        <Text variant="label">Amount</Text>
      </Stack>
      {rows.map((row) => (
        <Row key={row.id} account={row.account} amount={row.amount} chainId={chainId} />
      ))}
    </Stack>
  )
}

const Row = ({ account, amount, chainId }: { account: string; amount: any; chainId: number }) => {
  const { data: profile, isLoading } = useQuery(['userProfile', account], () => fetcher(`/api/users/${account}`))
  const { data: ensName } = useEnsName({
    address: account,
    chainId: chainId,
  })

  return (
    <Stack direction="horizontal" justify={'space-between'} align="center">
      <Stack direction={'horizontal'} align="center">
        <Avatar size="9" src={profile?.picture} label={`${account} profile picture`} />
        <Text>
          <a href={getExplorerLink(chainId, ExplorerType.ADDRESS, account)}>
            {ensName ? ensName : truncateAddress(account)}
          </a>
        </Text>
      </Stack>
      <Text>{ethers.utils.formatEther(amount)}</Text>
    </Stack>
  )
}
