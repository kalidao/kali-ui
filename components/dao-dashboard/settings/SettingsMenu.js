import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Flex, Box, Text } from '../../../styles/elements'
import { Stack, Button, IconChevronDown } from '@kalidao/reality'

export default function SettingsMenu({ setting, setSetting }) {
  return (
    <Stack direction={'horizontal'}>
      {items.map((item) => (
        <Button key={item.value} onClick={() => setSetting(item.value)} variant={'transparent'}>
          {item.title}
        </Button>
      ))}
    </Stack>
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
