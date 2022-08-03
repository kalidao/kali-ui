import { useState } from 'react'
import { Flex } from '../../../styles/elements'
import { UpdateVotingPeriod, UpdateQuorum, GovMenu, ToggleTransfer } from '../newproposal/internal'

export default function GovSettings() {
  const [view, setView] = useState(0)

  const views = [
    {
      title: null,
      component: <GovMenu setView={setView} />,
    },
    {
      title: 'Voting Period',
      component: <UpdateVotingPeriod setView={setView} />,
    },
    {
      title: 'Participation Needed',
      component: <UpdateQuorum setView={setView} />,
    },
    {
      title: 'Token Transferability',
      component: <ToggleTransfer setView={setView} />,
    },
  ]
  return (
    <Flex
      css={{
        width: '100%',
      }}
    >
      {views[view]['component']}
    </Flex>
  )
}
