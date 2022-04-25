import React from 'react'
import { styled } from '../../../styles/stitches.config'
import Network from './Network';
import Wallet from './Wallet';

export const UserBar = styled('div', {
  display: "flex",
  marginRight: "1rem"
});

export default function User() {
  return (
    <UserBar>
        {/* Network, Wallet */}
        <Network />
        <Wallet />
    </UserBar>
  )
}
