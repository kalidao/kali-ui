import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { VStack, HStack, Button, Text, Icon, Heading } from "@chakra-ui/react";
import { supportedChains } from "../../constants/supportedChains";
import { getNetworkName } from "../../utils/formatters";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import Select from "../elements/Select";
export default function ChooseNetwork(props) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [network, setNetwork] = useState(999); // for visibility handling in this component

  useEffect(() => {
    if (props.details["network"] != null) {
      setNetwork(props.details["network"]);
    }
  }, [props.details]);

  const updateNetwork = (e) => {
    let newValue = e.target.value;
    let array = props.details;
    array["network"] = newValue;
    setNetwork(newValue);
    props.setDetails(array);
    console.log(props.details);
  };

  return (
    <VStack>
      <Heading as="h1">
        <b>Select your chain:</b>
      </Heading>
      <Select
        bg="kali.900"
        color="kali.800"
        onChange={updateNetwork}
        defaultValue={props.details["network"]}
      >
        {/* <option value="999"></option> */}
        {supportedChains.map((item, index) => (
          <option key={index} value={item["chainId"]}>
            {item["name"]}
          </option>
        ))}
      </Select>
      {(network != 999 && chainId != network) ||
      (network != 999 && chainId != network && account == null) ? (
        <>
          <HStack id="not-connected">
            <Icon as={AiOutlineWarning} />
            <Text>please connect your wallet to {getNetworkName(network)}</Text>
          </HStack>
          <Button className="transparent-btn" onClick={value.connect}>
            Connect
          </Button>
        </>
      ) : network != 999 && chainId == network ? (
        <>
          <HStack id="connected-to-network">
            <Icon as={AiOutlineCheckCircle} />
            <Text>
              <i>connected to {getNetworkName(network)}</i>
            </Text>
          </HStack>
        </>
      ) : null}
          <Button
            className="transparent-btn"
            onClick={() => props.handleNext()}
          >
            Next »
          </Button>
    </VStack>
  );
}
