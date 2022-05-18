import { Flex, Text } from "../../../styles/elements";
import MemberCard from "./MemberCard";

export default function Members({ members }) {
  return(
    <Flex dir="col" css={{ gap: '0.1rem', position: 'relative', justifyContent: 'center', top: '5rem'}}>
      <Flex dir="row" align="separate" css={{ background: "$accent", padding: '1rem' }}>
        <Text color="background" variant="heading">Member</Text>
        <Text color="background" variant="heading">Shares</Text>
      </Flex>
      {members && members.members.map(member => (
        <MemberCard member={member} key={member.address} />
      ))}
    </Flex> 
  );
}

