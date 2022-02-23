import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Text, HStack, Spacer, Spinner, Center } from "@chakra-ui/react";
import DashedDivider from "../elements/DashedDivider";
import InfoTip from "../elements/InfoTip";

const ExtensionCard = ({ name }) => {
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
    <React.Fragment>
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
      {dao["extensions"] == undefined ? (
        <>
          <Spinner />
          <Center>
            We're fetching this data from the blockchain. Hang tight, it may
            take a few minutes!
          </Center>
        </>
      ) : dao["extensions"] == null ? (
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
