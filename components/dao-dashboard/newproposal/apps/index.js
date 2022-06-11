import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Button, Flex } from '../../../../styles/elements'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
// menu items
import SetCrowdsale from './SetCrowdsale'
import SetRedemption from './SetRedemption'
import Tribute from './Tribute'
import Back from '../../../../styles/proposal/Back'

function AppsMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('crowdsale')}>Crowdsale</Menu.Item>
        <Menu.Item onClick={() => setProposal('redemption')}>Redemption</Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('crowdsaleWithVesting')}>Crowdsale with Vesting</Menu.Item> */}
        {/* <Menu.Item onClick={() => setProposal('tributeWithVesting')}>Tribute with Vesting</Menu.Item> */}
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export { AppsMenu, SetCrowdsale, SetRedemption, Tribute }
