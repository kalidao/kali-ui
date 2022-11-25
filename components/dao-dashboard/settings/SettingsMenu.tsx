import { Stack, Button } from '@kalidao/reality'

type Props = {
  setting: string
  setSetting: React.Dispatch<React.SetStateAction<string>>
}

export default function SettingsMenu({ setting, setSetting }: Props) {
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
