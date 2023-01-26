import { ethers } from 'ethers'
import { useEnsName } from 'wagmi'
import { Text, Stack, Spinner } from '@kalidao/reality'
import { truncateAddress } from '../../../utils'
import { memberButton } from './styles.css'
import { Member } from './types'

type Props = {
  member: Member
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<Member>>
}

export default function MemberCard({ member, setActive }: Props) {
  const { data: ensName, isLoading } = useEnsName({
    address: member.address as `0xstring`,
    chainId: Number(1),
  })

  // TODO:
  //  - Add profile image

  return (
    <button className={memberButton} key={member.address} onClick={() => setActive(member)}>
      {member ? (
        <Stack>
          <Text>{isLoading || ensName === null ? truncateAddress(member?.address) : ensName}</Text>
          <Text>{Number(ethers.utils.formatEther(member?.shares)).toFixed(2)}</Text>
        </Stack>
      ) : (
        <Spinner />
      )}
    </button>
  )
}
