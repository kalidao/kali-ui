import React from 'react'
import { HeaderLayout, Heading } from "../../styles/Header";
import Kali from '../elements/Kali';
import Status from "./status/Status";

export default function Header() {
  return (
    <HeaderLayout>
      <Kali />
      <Heading>My DAOs</Heading>
      <Status />
    </HeaderLayout>
  )
}
