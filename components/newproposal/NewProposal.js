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
  Container
} from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";
import { newProposalHelper } from "../../constants/newProposalHelper";
import ConnectWallet from "./ConnectWallet";
import { BiEdit } from "react-icons/bi";

export default function NewProposal(props) {
  const [menuItem, setMenuItem] = useState(999); // arbitrary number where no proposal type is selected. if changed, must change below, too
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao, chainId } = value.state;
  const balances = props.balances;
  console.log("account", account);

  const handleClick = () => {
    setMenuItem(999);
  };

  const ProposalTile = (props) => {
    return (
      <LinkBox
        bg="kali.900"
        border="1px solid"
        p={5}
        m={2}
        borderRadius="2xl"
        //boxShadow="lg"
        _hover={{
          bgGradient: "linear(to-br, kali.600, kali.700)",
        }}
      >
        <LinkOverlay href="#" onClick={() => setMenuItem(props.id)}>
          <Heading
            size="md"
            fontWeight="extrabold"
            color="#080800"
            textTransform="uppercase"
          >
            {props.title}
          </Heading>
        </LinkOverlay>
        <Text color="#292929">{props.description}</Text>
      </LinkBox>
    );
  };

  const updateMenuItem = (e) => {
    let newValue = e.target.value;
    setMenuItem(newValue);
  };

  const BackButton = () => {
    return (
      <Button size="sm" onClick={handleClick} marginBottom={5}>
        « Back
      </Button>
    );
  };

  return (
    <>
    <HStack>
      <Icon as={BiEdit} w={10} h={10} color="#5a2686" />
      <Heading as="h1">Proposals</Heading>
    </HStack>
      {dao == null ? null : account == null ? (
        <Box className="gradient-item dashboard-tile" mt={10} color="white">
        <Text>Please connect your account to start making proposals!</Text>
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
              <BackButton />
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
                    />
                  ) : null
                )}
              </Grid>
            )}


          {Object.entries(newProposalHelper).map(([k, v]) =>
            menuItem == k ? (
              <Box key={`component-${k}`} p={5} border="1px solid">
                {newProposalHelper[k]["component"]}
              </Box>
            ) : null
          )}
        </>
      )}
    </>
  );
}
