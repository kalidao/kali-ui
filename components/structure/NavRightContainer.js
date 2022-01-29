import React, { Component, useState, useContext, useEffect } from "react";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import AppContext from "../../context/AppContext";
import Link from "next/link";
import { Divider, HStack, Spacer } from "@chakra-ui/react";
import Hamburger from "./Hamburger";
import Kali from "./Kali";
import Account from "./Account";
import Chain from "./Chain";

export default function NavRightContainer(props) {
  return (
    <HStack
      color={props.color}
      border="1.5px solid"
      borderRadius="xl"
      spacing={1}
      pl={3}
      borderColor={props.borderColor}
      height="45px"
      margin={{sm: '10px 0 20px 0 !important', md: '0 !important', lg: '0 !important', xl: '0 !important', '2xl': '0 !important'}}
    >
      <Chain />
      <Account message="Connect" />
      <Hamburger />
    </HStack>
  );
}
