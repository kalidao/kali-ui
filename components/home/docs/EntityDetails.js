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

export default function EntityDetails({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;

  const handleChange = (e) => {
    details["legal"]["docs"] = e.target.value;
    console.log(e.target.value);
    setDetails(details);
  };

  return (
    <>
      <Heading as="h2">Tell us about your entity</Heading>
      <VStack>
        <HStack>
          <Text>Link to your governing document</Text>
          <InfoTip
            label={
              "For instance, an operating agreement. We recommend uploading your document to IPFS."
            }
          />{" "}
        </HStack>
        <Input onChange={handleChange} />
      </VStack>
      <Button onClick={() => handleNext()}>Next</Button>
    </>
  );
}
