import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex, Text } from '../../../../styles/elements'
import { FcSalesPerformance } from 'react-icons/fc'
import { MdOutlineRedeem, MdOutlineConstruction } from 'react-icons/md'
// menu items
import SetCrowdsale from './SetCrowdsale'
import SetRedemption from './SetRedemption'
import Tribute from './Tribute'
import Back from '../../../../styles/proposal/Back'

function AppsMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Text> </Text>
      <Text variant="instruction">(1) Swap :</Text>
      <Text variant="instruction">
        KaliDAOs may swap their KaliDAO tokens for ETH or ERC20 tokens publicly or privately.
      </Text>
      <Text variant="instruction">(2) Redemption :</Text>
      <Text variant="instruction">
        KaliDAO members may redeem a portion of KaliDAO treasury by burning their KaliDAO tokens.
      </Text>
      <Menu>
        <Menu.Item onClick={() => setProposal('crowdsale')}>
          <MdOutlineConstruction />
          Swap
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
