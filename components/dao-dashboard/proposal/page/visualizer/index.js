import React from 'react'
import Mint from './Mint'
import Burn from './Burn'
import Escape from './Escape'
import Info from '../../../../../styles/Info'

export default function Visualizer({ proposal }) {
  console.log(proposal)
  let heading, icon, component
  switch (proposal?.proposalType) {
    case "MINT" :
      heading = "Minting"
      component = <Mint accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case "BURN" :
      heading = "Burning"
      component = <Burn accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case "ESCAPE" : 
      heading = "Escaping"
      component = <Escape killing={proposal?.amounts?.[0]} />
      break
  }
  return (<Info heading={heading}>
    {component}
    </Info>)
}
