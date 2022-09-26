import React from 'react'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Stack, Stat } from '@kalidao/reality'

export default function Results({ votes }) {
  const yesVotes = votes.filter((vote) => vote['vote'] === true)

  return (
    <Stack direction="horizontal">
      <Stat label="Yes" value={yesVotes.length} meta={<CheckIcon color="green" />} />
      <Stat label="No" value={votes.length - yesVotes.length} meta={<Cross2Icon color="red" />} />
    </Stack>
  )
}
