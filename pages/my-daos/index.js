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

const graph = {
  1: "https://api.thegraph.com/subgraphs/name/nerderlyne/kali-mainnet",
  42161: "https://api.thegraph.com/subgraphs/name/nerderlyne/kali-arbitrum",
  4: "https://api.thegraph.com/subgraphs/name/nerderlyne/kali-rinkeby",
};

export default function MyDaos() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;
  const [daos, setDaos] = useState(null);

  useEffect(() => {
    fetchData();
  }, [chainId, account]);

  async function fetchData() {
    if (account != null) {
      value.setLoading(true);
      console.log(graph[chainId]);
      try {
        const result = await fetch(graph[chainId], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query {
              members(where: {
                address: "${account}"
              }) {
                dao {
                  id
                  token {
                    name
                  }
                }
              }
            }`,
          }),
        }).then((res) => res.json());
        console.log(result);
        setDaos(result["data"]["members"]);
        value.setLoading(false);
      } catch (e) {
        value.toast(e);
        value.setLoading(false);
      }
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
                <Select onChange={handleChange} defaultValue={chainId}>
                  {supportedChains.map((item, index) => (
                    <option key={index} value={item.chainId}>
                      {item.name}
                    </option>
                  ))}
                </Select>

                {daos.map((item, index) => (
                  <ListItem key={index}>
                    <Link href={`../daos/${item.dao.id}`}>
                      <DaoCard
                        key={index}
                        name={item.dao.token.name}
                        dao={item.dao.id}
                      />
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
