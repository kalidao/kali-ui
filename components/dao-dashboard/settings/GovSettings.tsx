import { useState } from 'react'
import { UpdateSupermajority } from '../newproposal/internal/UpdateSupermajority'
import { ToggleTransfer } from '../newproposal/internal/ToggleTransfer'
import { GovMenu } from '../newproposal/internal/GovMenu'
import { UpdateVotingPeriod } from '../newproposal/internal/UpdateVotingPeriod'
import { UpdateQuorum } from '../newproposal/internal/UpdateQuorum'

export function GovSettings() {
  const [view, setView] = useState(0)

  const views = [
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
    <div className="flex flex-col space-y-2 items-start justify-between">
      <GovMenu view={view} setView={setView} />
      <div className="w-full">{views[view]['component']}</div>
    </div>
  )
}
