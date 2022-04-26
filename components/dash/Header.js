import React from 'react'
import { HeaderLayout, HeaderRight, Heading } from "../../styles/Header";
import Kali from '../elements/Kali';
import Status from "./status/Status";

export default function Header() {
  return (
    <HeaderLayout>
      <Kali />
      <HeaderRight>
        <Heading>My DAOs</Heading>
        <Status />
      </HeaderRight>
    </HeaderLayout>
  )
}
