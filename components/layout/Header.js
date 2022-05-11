import React from 'react'
import Kali from '../elements/Kali';
import { styled } from '../../styles/stitches.config';
import { Flex, Text } from '../../styles/elements';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const StyledHeader = styled(Flex, {
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 0.5rem',
  
  '@media (min-width: 1020px)': {
    minWidth: '1020px'
  },
})
export default function Header() {
  return (
    <StyledHeader>
      <Kali />
      <ConnectButton>Connect</ConnectButton>
    </StyledHeader>
  )
}
