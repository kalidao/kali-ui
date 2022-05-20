import { Flex, Text } from "../../../styles/elements";
import MemberCard from "./MemberCard";

export default function Members({ members }) {
  return(
    <Flex dir="col" css={{ gap: '0.1rem', position: 'relative', justifyContent: 'center', top: '5rem', left: '25%', background: '$foreground', width: '50%'}}>
      <Flex dir="row" align="separate" css={{ background: "$accent", padding: '1rem' }}>
        <Text color="background" css={{ fontWeight: '800'}}>Member</Text>
        <Text color="background" css={{ fontWeight: '800'}}>Shares</Text>
      </Flex>
      {members && members.members.map(member => (
        <MemberCard member={member} key={member.address} />
      ))}
    </Flex> 
  );
}

