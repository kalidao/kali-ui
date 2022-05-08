import React from 'react'
import Kali from '../elements/Kali';
import { Flex, Text } from '../../styles/elements';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <Flex css={{
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: "1px solid $border",
      maxWidth: '100vw',
      minHeight: '8vh',
      padding: '0 0.5rem'
    }}>
      <Kali />
      <ConnectButton />
    </Flex>
  )
}
