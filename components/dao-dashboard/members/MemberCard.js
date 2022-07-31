import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEnsName } from 'wagmi'
import { Box, Flex, Text } from '../../../styles/elements'
import { truncateAddress } from '../../../utils/'
import { Spinner } from '../../elements'

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
    <Flex
      as="button"
      key={member?.address}
      gap="md"
      css={{
        all: 'unset',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Regular',
        background: active ? '$violet3' : '$gray2',
        padding: '10px 20px',
        border: '1px solid $gray3',
        color: '$gray12',
      }}
      onClick={() => setActive(member)}
    >
      <Text>{isLoading || ensName === null ? truncateAddress(member?.address) : ensName}</Text>
      <Text>{Number(ethers.utils.formatEther(member?.shares)).toFixed(2)}</Text>
    </Flex>
  )
}
