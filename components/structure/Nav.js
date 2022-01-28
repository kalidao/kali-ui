import React, { Component, useState, useContext, useEffect } from "react"
import { BrowserView, MobileView, isBrowser } from "react-device-detect"
import AppContext from "../../context/AppContext"
import Link from "next/link"
import { Flex, Spacer, HStack } from "@chakra-ui/react"
import NavRightContainer from "./NavRightContainer"
import Hamburger from "./Hamburger"
import Kali from "./Kali"
import KaliMobile from "./KaliMobile"
import Account from "./Account"
import Chain from "./Chain"
import DraftDoc from "../tools/DraftDoc"

export default function HomeNav() {
  const value = useContext(AppContext)
  const { web3, account, chainId } = value.state

  return (
    <HStack
      minH="10vh"
      minW="auto"
      id="nav"
      alignItems="top"
    >
      <Kali />
      <Spacer />
      <DraftDoc />
      <NavRightContainer />
    </HStack>
  )
}
