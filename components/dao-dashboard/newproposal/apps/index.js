import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Button, Flex } from '../../../../styles/elements'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
// menu items
import Crowdsale from './Crowdsale'
import SetRedemption from './SetRedemption'
import Tribute from './Tribute'

function AppsMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('crowdsale')}>Crowdsale</Menu.Item>
        <Menu.Item onClick={() => setProposal('redemption')}>Redemption</Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('crowdsaleWithVesting')}>Crowdsale with Vesting</Menu.Item> */}
        {/* <Menu.Item onClick={() => setProposal('tributeWithVesting')}>Tribute with Vesting</Menu.Item> */}
      </Menu>
      <Button variant="back" onClick={() => setProposal('menu')}>
        <DoubleArrowLeftIcon />
        Back
      </Button>
    </Flex>
  )
}

export { AppsMenu, Crowdsale, SetRedemption, Tribute }
