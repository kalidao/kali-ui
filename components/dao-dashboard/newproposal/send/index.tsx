import React from 'react'
import Image from 'next/image'
import { Menu } from '@design/proposal/Menu'
import { IconNFT, Box } from '@kalidao/reality'
import { Flex } from '@design/elements'
import { FaEthereum } from 'react-icons/fa'
import { GiToken } from 'react-icons/gi'
// menu items
import SendErc20 from './SendErc20'
import SendErc721 from './SendErc721'
import SendEth from './SendEth'
import Back from '@design/proposal/Back'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function SendMenu({ setProposal }: Props) {
  return (
    <Box>
      <Menu>
        <Menu.Item onClick={() => setProposal('eth')}>
          <FaEthereum /> ETH
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('erc20')}>
          <GiToken /> ERC20
        </Menu.Item>
        <Menu.Item onClick={() => setProposal('erc721')}>
          <IconNFT /> ERC721
        </Menu.Item>
      </Menu>
      <Back onClick={() => setProposal('menu')} />
    </Box>
  )
}

export { SendMenu, SendErc20, SendErc721, SendEth }
