import { useState } from 'react'
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
    <div className="flex flex-col md:flex-row items-start justify-between">
      {views[0]['component']}
      <div className="w-full">{views[view]['component']}</div>
    </div>
  )
}
