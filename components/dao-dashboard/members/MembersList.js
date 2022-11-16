import { ethers } from 'ethers'
import { Box, Stack } from '@kalidao/reality'
import MemberCard from './MemberCard'

export default function MembersList({ members, active, setActive }) {
  // TODO: Add search
  console.log('active', active)
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
