import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import Layout from "../../components/structure/Layout";
import {
  Button,
  List,
  ListItem,
  Text,
  Box,
  Link,
  Heading,
  Spacer,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { factoryInstance } from "../../eth/factory";
import { addresses } from "../../constants/addresses";
import { fetchMembers } from "../../utils/fetchDaoInfo";
import { blocks } from "../../constants/blocks";
import { fetchEvents } from "../../utils/fetchEvents";
import { getNetworkName } from "../../utils/formatters";
import { supportedChains } from "../../constants/supportedChains";
import DashedDivider from "../../components/elements/DashedDivider";
const abi = require("../../abi/KaliDAO.json");
import Select from "../../components/elements/Select";
const DaoCard = ({ name, dao, key }) => {
  return (
    <Box
      bg="hsl(0, 92%, 6%, 20%)"
      color="kali.800"
      p="3"
      m="2"
      borderRadius="3xl"
      key={key}
    >
      <HStack>
        <Text>Name</Text>
        <Spacer />
        <Text>{name}</Text>
      </HStack>
      <DashedDivider />
      <HStack>
        <Text>Address</Text>
        <Spacer />
        <Text>{dao}</Text>
      </HStack>
    </Box>
  );
};

export default function MyDaos() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;
  const [daos, setDaos] = useState(null);

  useEffect(() => {
    fetchData();
  }, [chainId]);

  async function fetchData() {
    value.setLoading(true);

    try {
      console.log("trying");
      const allDaos = [];

      let address = addresses[chainId]["factory"];

      const factory = factoryInstance(address, web3);

      const factoryBlock = blocks["factory"][chainId];

      let eventName = "DAOdeployed";

      let events = await fetchEvents(
        factory,
        web3,
        factoryBlock,
        eventName,
        chainId
      );
      console.log("events", events);

      for (let i = 0; i < events.length; i++) {
        let dao_ = events[i]["kaliDAO"];
        let name_ = events[i]["name"];
        let docs_ = events[i]["docs"];

        const instance = new web3.eth.Contract(abi, dao_);

        let members = await fetchMembers(instance, web3, chainId, factoryBlock);
        console.log(members);

        for (let m = 0; m < members.length; m++) {
          if (members[m]["member"].toLowerCase() == account.toLowerCase()) {
            allDaos.push({ dao: dao_, name: name_ });
            console.log("docs for this one", docs_);
          }
        }
      }

      setDaos(allDaos);
      value.setLoading(false);
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }
  }

  const handleChange = async (e) => {
    let id = e.target.value;
    if (chainId != id) {
      await value.switchChain(id);
    }
  };

  return (
    <Layout>
      {account == null ? (
        <Button className="transparent-btn" onClick={value.connect}>
          Connect to see your DAOs
        </Button>
      ) : (
        <>
          {daos == null ? null : (
            <List>
              <VStack>
                <Heading as="h2">My DAOs</Heading>

                <Text fontSize="2xl" fontWeight="600">
                  Select chain:
                </Text>
                <Select
                  onChange={handleChange}
                  defaultValue={chainId}
                  bg="kali.900"
                  color="kali.800"
                >
                  {supportedChains.map((item, index) => (
                    <option key={index} value={item.chainId}>
                      {item.name}
                    </option>
                  ))}
                </Select>

                {daos.map((item, index) => (
                  <ListItem key={index}>
                    <Link href={`../daos/${item.dao}`}>
                      <DaoCard key={index} name={item.name} dao={item.dao} />
                    </Link>
                  </ListItem>
                ))}
              </VStack>
            </List>
          )}
        </>
      )}
    </Layout>
  );
}
