import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../context/AppContext";
import {
  VStack,
  HStack,
  Button,
  Text,
  Link,
  Input,
  Heading,
  Icon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Select from "../../elements/Select";
import DateSelect from "../../elements/DateSelect";
import InfoTip from "../../elements/InfoTip";

export default function HaveEntity({ setActive }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;

  return (
    <>
      <VStack>
        <Heading as="h2">Do you have a legal entity for your DAO?</Heading>
        <HStack>
          <Button onClick={() => setActive(1)}>Yes!</Button>
          <Button onClick={() => setActive(2)}>Not yet!</Button>
        </HStack>
      </VStack>
    </>
  );
}
