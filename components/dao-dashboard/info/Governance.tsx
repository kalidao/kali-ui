import React from 'react'
import { Card, CardContent } from '@components/ui/card'
import { formatVotingPeriod } from '@utils/index'
import { Check, X } from 'lucide-react'

type Props = {
  votingPeriod: number
  quorum: number
  supermajority: number
  paused: boolean
  gracePeriod: number
}

export default function Governance({ votingPeriod, quorum, supermajority, paused, gracePeriod }: Props) {
  const gov = [
    {
      title: 'Voting Period',
      value: formatVotingPeriod(votingPeriod),
    },
    {
      title: 'Participation Needed',
      value: `${quorum}%`,
    },
    {
      title: 'Approval Needed',
      value: `${supermajority}%`,
    },
    {
      title: 'Token Transferability',
      value: paused ? 'Disabled' : 'Enabled',
      icon: paused ? X : Check,
    },
    {
      title: 'Grace Period',
      value: gracePeriod,
    },
  ]

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {gov?.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{item.title}</span>
              <div className="flex items-center">
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                <span className="font-bold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
