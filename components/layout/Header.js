import React from 'react'
import Kali from './Kali'
import { styled } from '../../styles/stitches.config'
import { Flex, Text } from '../../styles/elements'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const StyledHeader = styled(Flex, {
  // borderBottom: '1px solid $gray800',
  boxShadow:
    'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
  background: '$background',
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

export default function Header({ heading, props }) {
  return (
    <StyledHeader {...props}>
      <Kali />
      <Flex
        css={{
          position: 'relative',
          width: '100%',
          height: '5rem',
          padding: '0 1rem 0 1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '5rem',
          '@media (max-width: 1040px)': {
            justifyContent: 'flex-end',
            margin: '0',
          },
        }}
      >
        <Text
          as="h1"
          variant="heading"
          css={{
            fontFamily: 'Screen',
            '@media (max-width: 1040px)': {
              display: 'none',
            },
          }}
        >
          {heading}
        </Text>
        <ConnectButton>Connect</ConnectButton>
      </Flex>
    </StyledHeader>
  )
}
