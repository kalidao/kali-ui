import React from "react";
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
  Center,
} from "@chakra-ui/react";
import { presets } from "../../constants/presets";
import { GiCheckMark } from "react-icons/gi";

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
            <Text>
              <b>{item.type["voting"]} Days</b>
            </Text>
          </HStack>
          <DashedDivider />
          <HStack>
            <Text>Quorum</Text>
            <Spacer />
            <Text>
              <b>{item.type["quorum"]}%</b>
            </Text>
          </HStack>
          <DashedDivider />
          <HStack>
            <Text>Supermajority</Text>
            <Spacer />
            <Text>
              <b>{item.type["supermajority"]}%</b>
            </Text>
          </HStack>
          <DashedDivider />
          <HStack>
            <Text>Transferable</Text>
            <Spacer />
            <Text>{item.type["paused"] === 0 ? <GiCheckMark /> : "✖"}</Text>
          </HStack>
          <Spacer p={5} />
          {Object.keys(item.type["extensions"]).length !== 0 ? (
            <Text>
              <UnorderedList styleType="none" m="0">
                {Object.entries(item.type["extensions"]).map(([key, value]) => (
                  <ListItem key={key}>{value["description"]}</ListItem>
                ))}
              </UnorderedList>
            </Text>
          ) : null}
        </LinkOverlay>
      </LinkBox>
    );
  };

  return (
    <VStack id="chooseDaoType">
      <Heading as="h1">Select a template</Heading>
      <br></br>
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={15}
      >
        {presets.map((item, index) => (
          <DaoBox key={index} id={index} type={item} />
        ))}
      </Grid>
      <br></br>
      <Center>
        <Button className="transparent-btn" onClick={handleNext}>
          Custom
        </Button>
      </Center>
    </VStack>
  );
}
