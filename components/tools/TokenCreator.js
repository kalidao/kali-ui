import React, { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import TokenForm from "./TokenForm.js";
// import NftForm from "./NftForm.js";

export default function TokenCreator() {
  const [tokenVisible, setTokenVisible] = useState(false);
  const [nftVisible, setNftVisible] = useState(false);

  const toggleTokenCreation = () => {
    setTokenVisible(() => !tokenVisible);
    console.log("hello")
  };

  const toggleNftCreation = () => {
    setNftVisible(() => !nftVisible);
  };

  return (
    <>
      <HStack>
        <Button onClick={toggleTokenCreation}>Gift ERC20</Button>
        <Button onClick={toggleNftCreation}>Gift ERC721</Button>
      </HStack>
      <>{tokenVisible ? <TokenForm /> : null}</>
      {/* <>{nftVisible ? <NftForm dao={dao["address"]} /> : null}</> */}
    </>
  );
}
