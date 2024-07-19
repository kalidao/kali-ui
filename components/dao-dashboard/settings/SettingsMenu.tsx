import { Button } from '@components/ui/button'
import { cn } from '@utils/util'
import { Settings, FileText } from 'lucide-react'

type Props = {
  setting: string
  setSetting: React.Dispatch<React.SetStateAction<string>>
}

export function SettingsMenu({ setting, setSetting }: Props) {
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
    <div className="flex space-x-2 py-1">
      {items.map((item) => (
        <Button
          key={item.value}
          size="sm"
          onClick={() => setSetting(item.value)}
          className={cn(
            'flex items-center',
            item.active ? 'border-2 bg-violet-100 dark:bg-violet-800 border-violet-500' : '',
          )}
        >
          {item.icon}
          {item.title}
        </Button>
      ))}
    </div>
  )
}
