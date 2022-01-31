import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  VStack,
  HStack,
  Text,
  LinkBox,
  LinkOverlay,
  Grid,
  Icon,
  Spacer,
  Divider,
  Heading,
  UnorderedList,
  ListItem,
  Button,
  Center
} from "@chakra-ui/react";
import { convertVotingPeriod } from "../../utils/formatters";
import { presets } from "../../constants/presets";

export default function ChooseType({ details, setDetails, handleNext }) {
  const handleClick = (id) => {
    details["daoType"] = id;
    details["governance"]["quorum"] = presets[id]["quorum"];
    details["governance"]["supermajority"] = presets[id]["supermajority"];
    details["governance"]["votingPeriod"] = presets[id]["voting"];
    details["governance"]["paused"] = presets[id]["paused"];

    if (id === 0) {
      details["extensions"]["tribute"]["active"] = true;
    }
    if (id === 1) {
      details["extensions"]["redemption"]["active"] = true;
      details["extensions"]["redemption"]["redemptionStart"] =
        presets[id]["extensions"]["redemption"]["redemptionStart"];
      details["extensions"]["redemption"]["tokenArray"] =
        presets[id]["extensions"]["redemption"]["tokenArray"];

      details["extensions"]["crowdsale"]["active"] = true;
      details["extensions"]["crowdsale"]["purchaseToken"] =
        presets[id]["extensions"]["crowdsale"]["purchaseToken"];
      details["extensions"]["crowdsale"]["purchaseMultiplier"] =
        presets[id]["extensions"]["crowdsale"]["purchaseMultiplier"];
      details["extensions"]["crowdsale"]["purchaseLimit"] =
        presets[id]["extensions"]["crowdsale"]["purchaseLimit"];
      details["extensions"]["crowdsale"]["saleEnds"] =
        presets[id]["extensions"]["crowdsale"]["saleEnds"];
      details["extensions"]["crowdsale"]["listId"] =
        presets[id]["extensions"]["crowdsale"]["listId"];
    }
    if (id === 2) {
      details["extensions"]["redemption"]["active"] = true;
      details["extensions"]["redemption"]["redemptionStart"] =
        presets[id]["extensions"]["redemption"]["redemptionStart"];
      details["extensions"]["redemption"]["tokenArray"] =
        presets[id]["extensions"]["redemption"]["tokenArray"];
    }

    setDetails(details);
    console.log("details", details);

    handleNext();
  };

  const custom = () => {};

  const DashedDivider = () => {
    return (
      <Divider
        orientation="horizontal"
        variant="dashed"
        borderColor="white"
        mt={1}
        mb={5}
      />
    );
  };

  const DaoBox = (item) => {
    return (
      <LinkBox className="dao-type" key={item.id}>
        <LinkOverlay href="#" onClick={() => handleClick(item.id)}>
          <HStack mb={5}>
            <Icon as={item.type["icon"]} color="white.500" boxSize={10} />
            <Heading>{item.type["type"]}</Heading>
          </HStack>

          <HStack>
            <Text>Voting Period</Text>
            <Spacer />
            <Text>{convertVotingPeriod(item.type["voting"])}</Text>
          </HStack>
          <DashedDivider />
          <HStack>
            <Text>Quorum</Text>
            <Spacer />
            <Text>{item.type["quorum"]}%</Text>
          </HStack>
          <DashedDivider />
          <HStack>
            <Text>Supermajority</Text>
            <Spacer />
            <Text>{item.type["supermajority"]}%</Text>
          </HStack>
          <DashedDivider />
          <HStack>
            <Text>Shares</Text>
            <Spacer />
            <Text>
              {item.type["paused"] == 0 ? "Transferrable" : "Nontransferrable"}
            </Text>
          </HStack>
          <Spacer p={5} />
          <Text>
            Extras:
            <UnorderedList>
              {Object.entries(item.type["extensions"]).map(([key, value]) => (
                <ListItem key={key}>
                  <Text>{value["description"]}</Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Text>
        </LinkOverlay>
      </LinkBox>
    );
  };

  return (
    <VStack id="chooseDaoType">
      <Heading as="h1">
        <b>Select governance type:</b>
      </Heading>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={15}
      >
        {presets.map((item, index) => (
          <DaoBox key={index} id={index} type={item} />
        ))}
      </Grid>
      <Center><Button onClick={handleNext}>Custom</Button></Center>
    </VStack>
  );
}
