import React from 'react'
import Image from 'next/image'
import { Menu } from '../../../../styles/proposal/Menu'
import { Flex, Button } from '../../../../styles/elements'
import { FaEthereum } from 'react-icons/fa'
import { FcLandscape, FcHome } from 'react-icons/fc'
import { GiToken } from 'react-icons/gi'
// menu items
import SendErc20 from '../send/SendErc20'
import SendErc721 from '../send/SendErc721'
import SendEth from '../send/SendEth'
import Back from '../../../../styles/proposal/Back'

function AssetMenu({ setProposal }) {
  return (
    <Flex gap="md" dir="col">
      <Menu>
        <Menu.Item onClick={() => setProposal('art')}>
          <FcLandscape /> Art
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('real')}>
          <FcHome /> Real Estate
        </Menu.Item>
        {/* <Menu.Item onClick={() => setProposal('erc721')}>
          <Image src="/icons/NFT.svg" height="25px" width="25px" /> ERC721
        </Menu.Item> */}
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Flex>
  )
}

export { AssetMenu, SendErc20, SendErc721, SendEth }
