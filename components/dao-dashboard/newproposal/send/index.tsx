import React from 'react'
import { IconNFT, Box, Stack, IconEth, IconTokens } from '@kalidao/reality'
// menu items
import SendErc20 from './SendErc20'
import SendErc721 from './SendErc721'
import SendEth from './SendEth'
import Back from '@design/proposal/Back'
import { Item } from '../Item'

type Props = {
  setProposal: React.Dispatch<React.SetStateAction<string>>
}

function SendMenu({ setProposal }: Props) {
  return (
    <Box>
      <Stack>
        <Item onClick={() => setProposal('eth')} icon={<IconEth />} label="Send ETH" />
        <Item onClick={() => setProposal('erc20')} icon={<IconTokens />} label="Send ERC20" />
        <Item onClick={() => setProposal('erc721')} icon={<IconNFT />} label="Send ERC721" />
      </Stack>
      <Back onClick={() => setProposal('menu')} />
    </Box>
  )
}

export { SendMenu, SendErc20, SendErc721, SendEth }
