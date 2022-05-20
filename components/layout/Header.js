import React from 'react'
import Kali from '../elements/Kali';
import { styled } from '../../styles/stitches.config';
import { Flex, Text } from '../../styles/elements';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const StyledHeader = styled(Flex, {
  borderBottom: '1px solid $gray700',
  width: '100%',
  position: 'fixed',
  left: '0',
  right: '0',
  top: '0',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 0.5rem',
  zIndex: '99',
  
  filter: 'contrast(1.2)',
})
export default function Header({ heading, props}) {
  return (
    <StyledHeader {...props}>
      <Kali />
      <Flex css={{
        position: 'absolute',
        right: '0',
        left: '5',
        marginRight: '2rem',
        gap: '10rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Text as="h1" variant="heading" css={{ '@media (max-width: 1040px)': {
          display: 'none'
        }}}>{heading}</Text>
        <ConnectButton>Connect</ConnectButton>
      </Flex>
    </StyledHeader>
  )
}
