import { MagicWandIcon } from '@radix-ui/react-icons'
import { MdHowToVote } from 'react-icons/md'
import { Flex, Box, Text } from '../../../styles/elements'
import Pie from './Pie'

export default function MemberProfile({ member, proposals, votes, totalSupply }) {
  return (
    <Flex
      dir="col"
      css={{
        maxWidth: '80vw',
        minHeight: '100vh',
        flexDirection: 'row',
        paddingTop: '20px',
        gap: '10px',
      }}
    >
      <Card title="Proposals" icon={<MagicWandIcon />} info={proposals?.length} />
      <Card title="Votes" icon={<MdHowToVote />} info={votes?.length} />
      <Pie totalSupply={totalSupply} member={member} />
    </Flex>
  )
}

const Card = ({ title, icon, info }) => {
  return (
    <Flex
      css={{
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        border: '1px solid $gray3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.28) 0px 2px 4px',
        minWidth: '10rem',
        maxHeight: '10rem',
      }}
    >
      <Box
        css={{
          '& svg': {
            height: '35px',
            width: '35px',
          },
        }}
      >
        {icon}
      </Box>
      <Text
        css={{
          fontSize: '24px',
        }}
      >
        {title}
      </Text>
      <Text
        css={{
          fontFamily: 'Regular',
          fontSize: '24px',
        }}
      >
        {info}
      </Text>
    </Flex>
  )
}
