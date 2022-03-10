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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { factoryInstance } from "../../eth/factory";
import { addresses } from "../../constants/addresses";
import { supportedChains } from "../../constants/supportedChains";
import DashedDivider from "../../components/elements/DashedDivider";
import { isMobile } from "react-device-detect";
const abi = require("../../abi/KaliDAO.json");
import Select from "../../components/elements/Select";
import { graph } from "../../constants/graph";
import { truncateAddress } from "../../utils/formatters";

const DaoCard = ({ name, dao, key }) => {
  return (
    <WrapItem
      bg="hsl(0, 92%, 6%, 20%)"
      color="kali.800"
      p="3"
      m="2"
      borderRadius="3xl"
      key={key}
    >
      <Box>
        <HStack>
          <Text>Name</Text>
          <Spacer />
          <Text>{name}</Text>
        </HStack>
        <DashedDivider />
        <HStack>
          <Text>Address</Text>
          <Spacer />
          <Text>{truncateAddress(dao)}</Text>
        </HStack>
      </Box>
    </WrapItem>
  );
};

export default function MyDaos() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;
  const [daos, setDaos] = useState(null);

  useEffect(() => {
    fetchData();
  }, [chainId, account]);

  async function fetchData() {
    if (account != null && chainId != null) {
      value.setLoading(true);
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

        setDaos(result["data"]["members"]);
        value.setLoading(false);
      } catch (e) {
        value.toast(e);
        console.log(e);
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

                {isMobile == true ? null : (
                  <>
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
                  </>
                )}
                <Wrap>
                  {daos.map((item, index) => (
                    <Link href={`../daos/${item.dao.id}`} key={index}>
                      <DaoCard
                        key={index}
                        name={item.dao.token.name}
                        dao={item.dao.id}
                      />
                    </Link>
                  ))}
                </Wrap>
              </VStack>
            </List>
          )}
        </>
      )}
    </Layout>
  );
}
