import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex } from '../../../../styles/elements'
import { FcSalesPerformance } from 'react-icons/fc'
import { MdOutlineRedeem } from 'react-icons/md'
// menu items
import SetCrowdsale from './SetCrowdsale'
import SetRedemption from './SetRedemption'
import Tribute from './Tribute'
import Back from '../../../../styles/proposal/Back'

function AppsMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('crowdsale')}>
          <FcSalesPerformance />
          Crowdsale
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('redemption')}>
          <MdOutlineRedeem />
          Redemption
        </Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('crowdsaleWithVesting')}>Crowdsale with Vesting</Menu.Item> */}
        {/* <Menu.Item onClick={() => setProposal('tributeWithVesting')}>Tribute with Vesting</Menu.Item> */}
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export { AppsMenu, SetCrowdsale, SetRedemption, Tribute }
