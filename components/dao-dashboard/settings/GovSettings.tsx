import { useState } from 'react'
import { Stack, Box, Text } from '@kalidao/reality'
import { UpdateVotingPeriod, UpdateQuorum, GovMenu, ToggleTransfer } from '../newproposal/internal'
import UpdateSupermajority from '../newproposal/internal/UpdateSupermajority'

export default function GovSettings() {
  const [view, setView] = useState(1)

  const views = [
    {
      title: null,
      component: <GovMenu view={view} setView={setView} />,
    },
    {
      title: 'Voting Period',
      component: <UpdateVotingPeriod />,
    },
    {
      title: 'Participation Needed',
      component: <UpdateQuorum />,
    },
    {
      title: 'Approval Needed',
      component: <UpdateSupermajority />,
    },
    {
      title: 'Token Transferability',
      component: <ToggleTransfer />,
    },
  ]

  return (
    <Stack direction={'horizontal'} align="flex-start" justify={'space-between'}>
      {views[0]['component']}
      <Box width="full">{views[view]['component']}</Box>
    </Stack>
  )
}
