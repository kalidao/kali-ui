import React from 'react'
import Mint from './Mint'
import Burn from './Burn'
import VPeriod from './VPeriod'
import GPeriod from './GPeriod'
import Quorum from './Quorum'
import Supermajority from './Supermajority'
import Type from './Type'
import Pause from './Pause'
import Extension from './Extension'
import Escape from './Escape'
import Docs from './Docs'
import Call from './Call'
import Info from '../../../../../styles/Info'

export default function Visualizer({ proposal }) {
  console.log(proposal)
  let heading, component
  switch (proposal?.proposalType) {
    case 'MINT':
      heading = 'Minting'
      component = <Mint accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case 'BURN':
      heading = 'Burning'
      component = <Burn accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case 'CALL':
      heading = 'Contract Call'
      component = <Call accounts={proposal?.accounts} amounts={proposal?.amounts} payloads={proposal?.payloads} />
      break
    case 'VPERIOD':
      heading = 'Update Voting Period'
      component = <VPeriod amount={proposal?.amounts?.[0]} />
      break
    case 'GPERIOD':
      heading = 'Update Grace Period'
      component = <GPeriod amount={proposal?.amounts?.[0]} />
      break
    case 'QUORUM':
      heading = 'Update Quorum'
      component = <Quorum amount={proposal?.amounts?.[0]} />
      break
    case 'SUPERMAJORITY':
      heading = 'Update Supermajority'
      component = <Supermajority amount={proposal?.amounts?.[0]} />
      break
    case 'TYPE':
      heading = 'Update Voting Types'
      component = <Type amount={proposal?.amounts?.[0]} />
      break
    case 'PAUSE':
      heading = 'Update Token Transferability'
      component = <Pause amount={proposal?.amounts?.[0]} />
      break
    case 'EXTENSION':
      heading = 'Update Extension'
      component = <Extension accounts={proposal?.accounts} amounts={proposal?.amounts} payloads={proposal?.payloads} />
      break
    case 'ESCAPE':
      heading = 'Escaping'
      component = <Escape killing={proposal?.amounts?.[0]} />
      break
    case 'DOCS':
      heading = 'Update Docs'
      component = <Docs amount={proposal?.description} />
      break
  }

  return (
    <Info
      heading={heading}
      css={{
        maxWidth: '80vw',
      }}
    >
      {component}
    </Info>
  )
}
