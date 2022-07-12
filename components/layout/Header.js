import React from 'react'
import Kali from './Kali'
import { styled } from '../../styles/stitches.config'
import { Flex, Text } from '../../styles/elements'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const StyledHeader = styled(Flex, {
  borderBottom: '1px solid #a3a3ac1a',
  boxShadow: '0 1px 0 #04040533, 0 1.5px 0 #0606070d, 0 2px 0 #0404050d',
  background: '#36393f',
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
