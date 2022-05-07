import React from 'react'
import { HeaderLayout, HeaderRight, Heading } from "../../styles/Header";
import Kali from '../elements/Kali';
import Status from "./status/Status";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <HeaderLayout>
      <ConnectButton>Connect</ConnectButton>
    </HeaderLayout>
  )
}
