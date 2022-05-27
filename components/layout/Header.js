import React from 'react'
import Kali from '../elements/Kali';
import { styled } from '../../styles/stitches.config';
import { Flex, Text } from '../../styles/elements';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const StyledHeader = styled(Flex, {
  // borderBottom: '1px solid $gray800',
  boxShadow: 'hsl(0, 0%, 15%) 0px 3px 8px',
  background: '$gray900',
  width: '100%',
  position: 'fixed',
  left: '0',
  right: '0',
  top: '0',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 0.5rem',
  zIndex: '99',
})

export default function Header({ heading, props}) {
  return (
    <StyledHeader {...props}>
      <Kali />
      <Flex css={{
        position: 'relative',
        width: '100%',
        height: '5rem',
        padding: '0 1rem 0 1rem',
        justifyContent: 'space-between',
        alignItems: 'center',

        '@media (max-width: 1040px)': {
          margin: '0'
        }
      }}>
        <Text as="h1" variant="heading" css={{ '@media (max-width: 1040px)': {
          display: 'none'
        }}}>{heading}</Text>
        <ConnectButton>Connect</ConnectButton>
      </Flex>
    </StyledHeader>
  )
}