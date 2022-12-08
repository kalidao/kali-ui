import { ethers } from 'ethers'
import { Box, Stack } from '@kalidao/reality'
import MemberCard from './MemberCard'
import { Member } from './types'

type Props = {
  members: Member[]
  active: Member
  setActive: React.Dispatch<React.SetStateAction<Member>>
}

export default function MembersList({ members, active, setActive }: Props) {
  // TODO: Add search
  return (
    <Stack>
      {members.map((member) => (
        <MemberCard
          key={member?.address}
          member={member}
          active={member?.address === active?.address ? true : false}
          setActive={setActive}
        />
      ))}
    </Stack>
  )
}
