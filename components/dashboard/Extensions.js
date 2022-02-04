import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Text,
  UnorderedList,
  ListItem,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import DashedDivider from "../elements/DashedDivider";
import InfoTip from "../elements/InfoTip";

const ExtensionCard = ({ key, name }) => {
  const assignLabel = (name) => {
    let label;
    if (name === "crowdsale")
      return (label = "Sell membership in ETH or designated token");
    if (name === "tribute")
      return (label =
        "Burn token to claim fair share of DAO capital aka ragequit");
    if (name === "redemption")
      return (label =
        "Make a proposal with ETH, token or NFT as membership tribute");
    else return null;
  };

  return (
    <>
      <HStack>
        <Text>{name.replace(/^\w/, (s) => s.toUpperCase())}</Text>
        <Spacer />
        <InfoTip label={assignLabel(name)} />
      </HStack>

      <DashedDivider />
    </>
  );
};

export default function Extensions() {
  const value = useContext(AppContext);
  const { dao } = value.state;

  return (
    <>
      {dao["extensions"] == null ? (
        "No extensions installed"
      ) : (
        <>
          {Object.entries(dao["extensions"]).map(([name, key]) => (
            <ExtensionCard name={name} />
          ))}
        </>
      )}
    </>
  );
}
