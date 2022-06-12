import React from 'react'
import Image from 'next/image'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex, Button } from '../../../../styles/elements'
import { FaEthereum } from 'react-icons/fa'
import { GiToken } from 'react-icons/gi'
// menu items
import SendErc20 from './SendErc20'
import SendErc721 from './SendErc721'
import SendEth from './SendEth'
import Back from '../../../../styles/proposal/Back'

function SendMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('eth')}>
          <FaEthereum /> ETH
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('erc20')}>
          <GiToken /> ERC20
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('erc721')}>
          <Image src="/icons/NFT.svg" height="25px" width="25px" /> ERC721
        </Menu.Item>
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export { SendMenu, SendErc20, SendErc721, SendEth }
