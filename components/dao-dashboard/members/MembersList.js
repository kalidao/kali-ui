import { ethers } from 'ethers'
import { Flex, Text } from '../../../styles/elements'
import MemberCard from './MemberCard'

export default function MembersList({ members, active, setActive }) {
  // TODO: Add search
  return (
    <Flex
      css={{
        flexDirection: 'column',
        borderRight: '1px solid hsla(0, 0%, 90%, 0.1)',
        height: '90vh',
      }}
    >
      {members.map((member) => (
        <MemberCard
          key={member?.address}
          member={member}
          active={member?.address === active?.address ? true : false}
          setActive={setActive}
        />
      ))}
    </Flex>
  )
}
