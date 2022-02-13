import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Text,
  UnorderedList,
  ListItem,
  HStack,
  Spacer,
  Spinner
} from "@chakra-ui/react";
import DashedDivider from "../elements/DashedDivider";
import InfoTip from "../elements/InfoTip";

const ExtensionCard = ({ key, name }) => {
  const assignLabel = (name) => {
    if (name === "crowdsale")
      return "Sell membership in ETH or designated token";
    if (name === "tribute")
      return "Burn token to claim fair share of DAO capital aka ragequit";
    if (name === "redemption")
      return "Make a proposal with ETH, token or NFT as membership tribute";
    return null;
  };

  return (
    <React.Fragment key={key}>
      <HStack>
        <Text>{name.replace(/^\w/, (s) => s.toUpperCase())}</Text>
        <Spacer />
        <InfoTip label={assignLabel(name)} />
      </HStack>

      <DashedDivider />
    </React.Fragment>
  );
};

export default function Extensions() {
  const value = useContext(AppContext);
  const { dao } = value.state;

  return (
    <>
      {
        dao["extensions"] == undefined ? <Spinner /> :
        dao["extensions"] == null ? (
        "No extensions installed"
      ) : (
        <>
          {Object.entries(dao["extensions"]).map(([name, key]) => (
            <ExtensionCard key={key} name={name} />
          ))}
        </>
      )}
    </>
  );
}
