import { ethers } from 'ethers'
import { Avatar, IconEth, Stack, Text } from '@kalidao/reality'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@utils/fetcher'
import { chainId, useEnsName } from 'wagmi'
import { truncateAddress } from '@utils/truncateAddress'
import getExplorerLink, { ExplorerType } from '@utils/getExplorerLink'
import { useRouter } from 'next/router'

export default function Mint({ accounts, amounts }: { accounts: string[]; amounts: any }) {
  const router = useRouter()
  const chainId = Number(router.query.chainId)
  for (let i = 0; i < accounts.length; i++) {
    return MintRow(accounts[i], amounts[i], chainId)
  }
}

const MintRow = (account: string, amount: any, chainId: number) => {
  const { data: profile, isLoading } = useQuery(['userProfile', account], () => fetcher(`/api/users/${account}`))
  const { data: ensName } = useEnsName({
    address: account,
  })

  return (
    <Stack direction="horizontal" justify={'space-between'} align="center">
      <Avatar src={profile?.picture} label={`${account} profile picture`} />
      <Text>{ensName ? ensName : truncateAddress(account)}</Text>
      <Text>{ethers.utils.formatEther(amount)}</Text>
      <a href={getExplorerLink(chainId, ExplorerType.ADDRESS, account)} target="_blank" rel="noopenner noreferrer">
        <IconEth />
      </a>
    </Stack>
  )
}
