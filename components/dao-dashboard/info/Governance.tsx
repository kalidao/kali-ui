import React from 'react'
import { Card, Stack, Text, Spinner } from '@kalidao/reality'
import { formatVotingPeriod } from '@utils/index'

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
    },
    {
      title: 'Grace Period',
      value: gracePeriod,
    },
  ]
  return (
    <Card padding="6">
      <Stack>
        {gov?.map((item, index) => {
          return (
            <Stack key={index} direction="horizontal" justify="space-between" align="center">
              <Text>{item.title}</Text>
              <Text weight="bold">{item.value}</Text>
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
}
