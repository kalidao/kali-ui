import React from 'react'
import { Card, CardContent } from '@components/ui/card'
import { Progress } from '@components/ui/progress'
import { Calendar, Clock } from 'lucide-react'
import { prettyDate } from '@utils/prettyDate'

type Props = {
  votingPeriod: number
  start: number
}

export default function InfoCard({ start, votingPeriod }: Props) {
  const startDate = prettyDate(new Date(start * 1000))
  const end = start * 1000 + votingPeriod * 1000
  const endDate = prettyDate(new Date(end))
  const progress = Math.min(((Date.now() - start * 1000) / (votingPeriod * 1000)) * 100, 100)

  if (start == 0) {
    return (
      <Card className="p-6">
        <CardContent>
          <p className="text-sm text-gray-600">Voting hasn't started yet. Sponsor the proposal to start voting!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Start:</span>
            <span className="text-sm text-gray-600">{startDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">End:</span>
            <span className="text-sm text-gray-600">{endDate}</span>
          </div>
          <div>
            <span className="text-sm font-medium">Progress:</span>
            <Progress value={progress} className="mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
