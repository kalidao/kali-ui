import { MagicWandIcon } from '@radix-ui/react-icons'
import { MdHowToVote } from 'react-icons/md'
import { Card, Stack, Box, Text, Heading } from '@kalidao/reality'
import Pie from './Pie'

export default function MemberProfile({ member, proposals, votes, totalSupply }) {
  return (
    <Stack direction={"horizontal"} gap={"md"}>
    
      <MemberCard title="Proposals" icon={<MagicWandIcon height={30} width={30} color={"white"} />} info={proposals?.length} />
      <MemberCard title="Votes" icon={<MdHowToVote size={30} color={"white"} />} info={votes?.length} />
      <Pie totalSupply={totalSupply} member={member} />
    </Stack>
  )
}

const MemberCard = ({ title, icon, info }) => {
  return (
    <Box height="64" width="64" padding="6" backgroundColor={"backgroundSecondary"} borderRadius="2xLarge">
    <Stack align="center" justify={"center"} gap={"md"}>
      <Box color="foreground">
        {icon}
      </Box>
      <Heading>
        {title}
        </Heading>
      <Text
      size="headingOne"
      >
        {info}
      </Text>
    </Stack>
    </Box>
  )
}
