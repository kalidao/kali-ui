import { styled } from '@stitches/react'
import { Flex, Text } from '../../../styles/elements'
import MemberCard from './MemberCard'

const MembersBox = styled(Flex, {
  flexDirection: 'column',
  gap: '0.1rem',
  position: 'relative',
  background: '$foreground',
  minWidth: '90vw',
})

export default function Members({ members }) {
  console.log('members', members)
  return (
    <MembersBox>
      <Flex dir="row" align="separate" css={{ background: '$gray900', padding: '1rem' }}>
        <Text css={{ fontWeight: '800', color: '$accent' }}>Member</Text>
        <Text css={{ fontWeight: '800', color: '$accent' }}>Shares</Text>
        <Text css={{ fontWeight: '800', color: '$accent' }}>Percentage</Text>
      </Flex>
      {members &&
        members.members.map((member) => (
          <MemberCard member={member} key={member.address} totalSupply={members['token']['totalSupply']} />
        ))}
    </MembersBox>
  )
}
