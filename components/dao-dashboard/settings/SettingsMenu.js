import { Stack, Button } from '@kalidao/reality'

export default function SettingsMenu({ setting, setSetting }) {
  const items = [
    {
      title: 'Governance',
      value: 'gov',
      active: setting === 'gov',
    },
    {
      title: 'Documents',
      value: 'legal',
      active: setting === 'legal',
    },
  ]

  return (
    <Stack direction={'horizontal'}>
      {items.map((item) => (
        <Button
          key={item.value}
          size="small"
          onClick={() => setSetting(item.value)}
          variant={item.active ? 'secondary' : 'transparent'}
        >
          {item.title}
        </Button>
      ))}
    </Stack>
  )
}
