import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { Box, Card, Text, Stack, Spinner } from '@kalidao/reality'
import { truncateAddress } from '../../../utils/'

export default function MemberCard({ member, active, setActive }) {
  const { data: ensName, isLoading } = useEnsName({
    address: member?.address,
    chainId: Number(1),
  })
  const { push } = useRouter()
  const routeProfile = () => {
    push(`/users/${member.address}`)
  }

  // TODO:
  //  - Add profile image
  console.log('ens', ensName)

  return (
    <Card
      as="button"
      key={member?.address}
      padding="6"
      level="1"
      onClick={() => setActive(member)}
      hover
    >
      {member ? <Stack>
        <Text>{isLoading || ensName === null ? truncateAddress(member?.address) : ensName}</Text>
        <Text>{Number(ethers.utils.formatEther(member?.shares)).toFixed(2)}</Text>
      </Stack> : <Spinner />}
    </Card>
  )
}
