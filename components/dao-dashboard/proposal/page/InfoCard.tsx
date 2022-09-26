import React from 'react'
import { Stack, Text, Stat } from '@kalidao/reality'
import { prettyDate } from '@utils/prettyDate'

type Props = {
  votingPeriod: number
  start: number
}

export default function InfoCard({ start, votingPeriod }: Props) {
  const startDate = prettyDate(new Date(start * 1000))
  const end = start * 1000 + votingPeriod * 1000
  const endDate = prettyDate(new Date(end))

  console.log('date', start, votingPeriod, end)
  if (start == 0) {
    return (
      <Stack>
        <Text>Voting hasn't started yet. Sponsor the proposal to start voting!</Text>
      </Stack>
    )
  }

  return (
    <Stack direction={'vertical'}>
      <Stat label="Start" value={startDate} size="small" />
      <Stat label="End" value={endDate} size="small" />
    </Stack>
  )
}
