import React from 'react'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex, Button } from '../../../../styles/elements'
import { DoubleArrowLeftIcon } from '@radix-ui/react-icons'
// menu items
import SendErc20 from './SendErc20'
import SendErc721 from './SendErc721'
import SendEth from './SendEth'
import Back from '../../../../styles/proposal/Back'

function SendMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('eth')}>ETH</Menu.Item>
        <Menu.Item onClick={() => setProposal('erc20')}>ERC20</Menu.Item>
        <Menu.Item onClick={() => setProposal('erc721')}>ERC721</Menu.Item>
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export { SendMenu, SendErc20, SendErc721, SendEth }
