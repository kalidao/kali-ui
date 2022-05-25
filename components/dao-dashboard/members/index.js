import { styled } from "@stitches/react";
import { Flex, Text } from "../../../styles/elements";
import MemberCard from "./MemberCard";

const MembersBox = styled(Flex, {
  flexDirection: 'column',
  gap: '0.1rem', 
  position: 'relative', 
  background: '$foreground', 
  minWidth: '90vw'
})

export default function Members({ members }) {
  return(
    <MembersBox>
      <Flex dir="row" align="separate" css={{ background: "$accent", padding: '1rem' }}>
        <Text color="background" css={{ fontWeight: '800'}}>Member</Text>
        <Text color="background" css={{ fontWeight: '800'}}>Shares</Text>
      </Flex>
      {members && members.members.map(member => (
        <MemberCard member={member} key={member.address} />
      ))}
    </MembersBox> 
  );
}

