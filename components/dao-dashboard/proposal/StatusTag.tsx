import React from 'react'
import { Badge } from '@components/ui/badge'
import { Circle, CheckCircle, XCircle, HelpCircle } from 'lucide-react'

type Status = {
  text: string
  color: 'default' | 'secondary' | 'destructive' | 'outline'
  icon: React.ReactNode
}

type StatusProps = {
  sponsored: boolean
  votingPeriod: number
  votingStarts: number
  status: boolean
  proposalType: string
}

const StatusTag = ({ sponsored, proposalType, votingPeriod, votingStarts, status }: StatusProps) => {
  const currentStatus = (): Status => {
    // unsponsored
    if (!sponsored) {
      return {
        color: 'secondary',
        icon: <HelpCircle className="w-4 h-4" />,
        text: 'Unsponsored',
      }
    }
    // voting
    const timeLeft = new Date().getTime() - new Date(votingPeriod * 1000 + votingStarts * 1000).getTime()
    if (sponsored === true) {
      if (timeLeft > 0) {
        if (status === null) {
          return {
            color: 'default',
            icon: <Circle className="w-4 h-4" />,
            text: 'Process',
          }
        } else {
          return {
            color: status ? 'outline' : 'destructive',
            icon: status ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />,
            text: status ? 'Passed' : 'Failed',
          }
        }
      } else {
        return {
          color: 'default',
          icon: <Circle className="w-4 h-4" />,
          text: 'Voting',
        }
      }
    }
    // execute

    return {
      color: 'secondary',
      icon: <HelpCircle className="w-4 h-4" />,
      text: '...',
    }
  }

  const { color, text, icon } = currentStatus()

  return (
    <Badge variant={color} className="flex items-center gap-1">
      {icon}
      <span>{text}</span>
      <span className="ml-1 text-xs opacity-70">{proposalType}</span>
    </Badge>
  )
}

export { StatusTag }
