import { Flex, Text } from '../../../../styles/elements'
import { MdOutlineBallot, MdPeopleOutline, MdCached, MdApproval } from 'react-icons/md'

export default function GovMenu({ setView }) {
  return (
    <Flex
      css={{
        all: 'unset',
        display: 'flex',
        fontFamily: 'Regular',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Text
        css={{
          padding: '20px',
        }}
      >
        View the governance settings configured for the DAO. Make a proposal to change them.
      </Text>
      <GovItem title={'Voting Period'} icon={<MdOutlineBallot size={24} />} onClick={() => setView(1)} />
      <GovItem title={'Participation Needed'} icon={<MdPeopleOutline size={24} />} onClick={() => setView(2)} />
      <GovItem title={'Approval Needed'} icon={<MdApproval size={24} />} onClick={() => setView(3)} />
      <GovItem title={'Token Transferability'} icon={<MdCached size={24} />} onClick={() => setView(4)} />
    </Flex>
  )
}

const GovItem = ({ title, icon, onClick }) => {
  return (
    <Flex
      as="button"
      onClick={onClick}
      css={{
        all: 'unset',
        display: 'flex',
        padding: '20px',
        width: '100%',
        borderTop: '1px solid $gray3',
        borderBottom: '1px solid $gray3',
        gap: '10px',
        alignItems: 'center',
        justifyItems: 'space-between',
        color: '$gray12',

        '&:hover': {
          background: '$violet3',
          borderTop: '1px solid $gray4',
          borderBottom: '1px solid $gray4',
        },
      }}
    >
      {icon}
      <Flex
        css={{
          gap: '5px',
          fontSize: '16px',
          alignItems: 'center',
          justifyItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        {title}
      </Flex>
    </Flex>
  )
}
