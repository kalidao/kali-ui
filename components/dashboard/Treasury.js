import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Text, HStack, Spacer, Spinner, Center, Image } from "@chakra-ui/react";
import { fromDecimals } from "../../utils/formatters";
import DashedDivider from "../elements/DashedDivider";
import DAI from "../../public/img/coins/DAI.png";
import ETH from "../../public/img/coins/ETH.svg";
import USDC from "../../public/img/coins/USDC.svg";
import WETH from "../../public/img/coins/WETH.svg";

const TreasuryCard = ({ key, token, balance, src }) => {
  return (
    <>
      <HStack color="kali.900">
        <Image
          boxSize="20px"
          borderRadius="full"
          fallbackSrc="https://via.placeholder.com/150"
          src={src}
          alt=""
        />
        <Text>{token}</Text>
        <Spacer />
        <Text>{balance}</Text>
      </HStack>
      <DashedDivider />
    </>
  );
};

export default function Treasury() {
  const value = useContext(AppContext);
  const { dao } = value.state;

  const displayLogo = (source) => {
    switch (source) {
      case "DAI":
        return DAI.src;
      case "USDC":
        return USDC.src;
      case "ETH":
        return ETH.src;
      case "WETH":
        return WETH.src;
    }
  };

  return (
    <>
      {dao["balances"] != null ? (
        dao["balances"].map((b, index) => (
          <TreasuryCard
            key={index}
            token={b["token"]}
            balance={
              b["token"] === "USDC" || b["token"] === "USDT"
                ? fromDecimals(b["balance"], 6)
                : fromDecimals(b["balance"], 18)
            }
            src={displayLogo(b["token"])}
          />
        ))
      ) : (
        <>
          <Spinner />
          <Center>
            We're fetching this data from the blockchain. Hang tight, it may
            take a few minutes!
          </Center>
        </>
      )}
    </>
  );
}
