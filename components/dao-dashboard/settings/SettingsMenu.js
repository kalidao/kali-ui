import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Flex, Box, Text } from '../../../styles/elements'

export default function SettingsMenu({ setting, setSetting }) {
  return (
    <Flex
      css={{
        flexDirection: 'column',
        borderRight: '1px solid hsla(0, 0%, 90%, 0.1)',
        width: '20vw',
        height: '100%',
      }}
    >
      {items.map((item) => (
        <Item
          key={item.value}
          title={item.title}
          value={item.value}
          active={setting === item.value ? true : false}
          setSetting={setSetting}
        />
      ))}
    </Flex>
  )
}

const Item = ({ title, setSetting, value, active }) => {
  return (
    <Box
      as="button"
      css={{
        all: 'unset',
        padding: '20px',
        border: '1px solid $gray3',
        background: active ? '$violet3' : '$gray3',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onClick={() => setSetting(value)}
    >
      <Text
        css={{
          fontSize: '16px',
        }}
      >
        {title}
      </Text>
      <Box
        css={{
          '& svg': {
            height: '16px',
            width: '16px',
          },
        }}
      >
        <ChevronRightIcon />
      </Box>
    </Box>
  )
}

const items = [
  {
    title: 'Governance',
    value: 'gov',
  },
  {
    title: 'Documents',
    value: 'legal',
  },
]
