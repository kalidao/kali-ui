import React from 'react'
import { Button } from '@components/ui/button'
import { Hand, Users, Check, Coins } from 'lucide-react'
import { cn } from '@utils/util'

type Props = {
  view: number
  setView: React.Dispatch<React.SetStateAction<number>>
}

export function GovMenu({ view, setView }: Props) {
  const items = [
    {
      title: 'Voting Period',
      icon: <Hand className="w-5 h-5" />,
      onClick: () => setView(0),
      active: view === 0,
    },
    {
      title: 'Participation Needed',
      icon: <Users className="w-5 h-5" />,
      onClick: () => setView(1),
      active: view === 1,
    },
    {
      title: 'Approval Needed',
      icon: <Check className="w-5 h-5" />,
      onClick: () => setView(2),
      active: view === 2,
    },
    {
      title: 'Token Transferability',
      icon: <Coins className="w-5 h-5" />,
      onClick: () => setView(3),
      active: view === 3,
    },
  ]

  return (
    <div className="flex flex-col space-y-2.5 items-start">
      <p className="text-sm">Review setting and make proposal to change them.</p>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
        {items.map((item) => (
          <GovItem key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}

type ItemProps = {
  title: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}

const GovItem = ({ title, icon, active, onClick }: ItemProps) => {
  return (
    <Button
      size="sm"
      className={cn(
        'flex items-center space-x-2 ',
        active ? 'border-2  border-violet-500 bg-violet-200 dark:bg-violet-800' : null,
      )}
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
    </Button>
  )
}
