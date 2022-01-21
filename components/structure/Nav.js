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
import ERC20 from "../../abi/ERC20.json"

export default function HomeNav() {
  const value = useContext(AppContext)
  const { web3, account, chainId } = value.state
  const [admin, setAdmin] = useState(false)

  const isAdmin = () => {
    try {
      const contract = new web3.eth.Contract(
        ERC20,
        "0x8585ad16b5166E53Ff200384422843DfEFaF87Dc"
      )

      contract.methods
        .balanceOf(account)
        .call({ from: account })
        .then((_balance) => {
          _balance > 0 ? setAdmin(true) : setAdmin(false)
        })
    } catch {}
  }

  useEffect(() => {
    isAdmin()
  }, [admin, isAdmin])

  return (
    <HStack minH="10vh" minW="auto" id="nav">
      {isBrowser == true ? <Kali /> : null}
      <Spacer />
      {admin && <DraftDoc />}
      <NavRightContainer />
    </HStack>
  )
}
