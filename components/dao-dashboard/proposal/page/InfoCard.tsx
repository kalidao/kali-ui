import React from 'react'
import { Stack, Text, Stat, Card } from '@kalidao/reality'
import { prettyDate } from '@utils/prettyDate'
import { Progress } from '@design/Progress'

type Props = {
  votingPeriod: number
  start: number
}

export default function InfoCard({ start, votingPeriod }: Props) {
  const startDate = prettyDate(new Date(start * 1000))
  const end = (start * 1000) + (votingPeriod * 1000)
  const endDate = prettyDate(new Date(end))
  const endTimestamp = new Date(end).getSeconds()
  const now = new Date().getSeconds()
  const progress = endTimestamp - now / 100

  if (start == 0) {
    return (
      <Card padding="6">
        <Text>Voting hasn't started yet. Sponsor the proposal to start voting!</Text>
      </Card>
    )
  }
  
  return (
    <Card padding="6">
      <Stack>
        <Stat label="Start" value={startDate} size="small" />
        <Stat label="End" value={endDate} size="small" />
        <Stat label="Progress" value={<Progress value={progress} />} size="medium" />
      </Stack>
    </Card>
  )
}
