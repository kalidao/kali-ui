import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Select,
  Text,
  Box,
  Grid,
  LinkBox,
  LinkOverlay,
  Heading,
  Center,
  VStack,
  HStack,
  Icon,
  Button,
  Flex,
  Container,
  Spacer
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import { newProposalHelper } from "../../constants/newProposalHelper";
import ConnectWallet from "./ConnectWallet";
import { BiEdit } from "react-icons/bi";

export default function NewProposal(props) {
  const [menuItem, setMenuItem] = useState(999); // arbitrary number where no proposal type is selected. if changed, must change below, too
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao, chainId, visibleView, remount } = value.state;
  const balances = props.balances;
  console.log("account", account);

  useEffect(() => {
    console.log("testtt")
    setMenuItem(999);
  }, [remount]);

  const ProposalTile = (props) => {
    return (
      <LinkBox
        className="proposal-type-tile gradient-item"
      >
        <LinkOverlay href="#" onClick={() => setMenuItem(props.id)}>
          <HStack>
            <Icon as={props.icon} boxSize={9} p={2} rounded={5} border="1px solid white" />
            <Spacer />
          </HStack>
          <Heading>
            {props.title}
          </Heading>
        </LinkOverlay>
        <Text>{props.description}</Text>
      </LinkBox>
    );
  };

  const updateMenuItem = (e) => {
    let newValue = e.target.value;
    setMenuItem(newValue);
  };

  return (
    <>
    <HStack>
      <Icon as={BiEdit} w={10} h={10} className="h1-icon" />
      <Heading as="h1">New Proposal</Heading>
    </HStack>
      {dao == null ? null : account == null ? (
        <Box className="gradient-item dashboard-tile" mt={10} color="white">
        <Text mb={5}>Please connect your account to start making proposals!</Text>
        <Button
          className="transparent-btn"
          onClick={value.connect}
          border="none"
        >
          Connect
        </Button>
        </Box>
      ) : (
        <>
            {menuItem < 999 ? (
              null
            ) : (
              <Grid
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
              >
                {Object.entries(newProposalHelper).map(([k, v]) =>
                  newProposalHelper[k]["extension"] == null ||
                  ("extensions" in dao &&
                    dao["extensions"] != null &&
                    newProposalHelper[k]["extension"] in dao["extensions"]) ? (
                    <ProposalTile
                      key={`propTile-${k}`}
                      id={k}
                      title={newProposalHelper[k]["title"]}
                      description={newProposalHelper[k]["description"]}
                      icon={newProposalHelper[k]["icon"]}
                    />
                  ) : null
                )}
              </Grid>
            )}


          {Object.entries(newProposalHelper).map(([k, v]) =>
            menuItem == k ? (
              <Box key={`component-${k}`} p={5} id="new-proposal">
                <Heading as="h2">{newProposalHelper[k]["title"]}</Heading>
                {newProposalHelper[k]["component"]}
              </Box>
            ) : null
          )}
        </>
      )}
    </>
  );
}
