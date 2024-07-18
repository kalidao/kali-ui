import { Button } from '@components/ui/button'
import { Settings, FileText } from 'lucide-react'

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
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
    {
      title: 'Documents',
      value: 'legal',
      active: setting === 'legal',
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
  ]

  return (
    <div className="flex space-x-2">
      {items.map((item) => (
        <Button
          key={item.value}
          size="sm"
          onClick={() => setSetting(item.value)}
          variant={item.active ? 'secondary' : 'ghost'}
          className="flex items-center"
        >
          {item.icon}
          {item.title}
        </Button>
      ))}
    </div>
  )
}
