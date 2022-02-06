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
} from "@chakra-ui/react";
import { factoryInstance } from "../../eth/factory";
import { addresses } from "../../constants/addresses";
import { fetchMembers } from "../../utils/fetchDaoInfo";
import { getNetworkName } from "../../utils/formatters";
import DashedDivider from "../../components/elements/DashedDivider";
const abi = require("../../abi/KaliDAO.json");

const DaoCard = ({ name, dao }) => {
  return (
    <Box
      bg="hsl(0, 92%, 6%, 20%)"
      color="kali.800"
      p="3"
      m="2"
      borderRadius="3xl"
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
  const { web3, account } = value.state;
  const [daos, setDaos] = useState(null);
  // adding line to force vercel re-sync
  useEffect(() => {
    fetchData();
  }, [account]);

  async function fetchData() {
    value.setLoading(true);

    try {
      const allDaos = [];

      let keys = Object.keys(addresses);

      let size = keys.length;

      for (let j = 0; j < size; j++) {
        // loop thru chains

        let address = addresses[keys[j]]["factory"];

        const factory = factoryInstance(address, web3);

        const events = await factory.getPastEvents("DAOdeployed", {
          fromBlock: 0,
          toBlock: "latest",
        });

        const daosThisChain = [];

        for (let i = 0; i < events.length; i++) {
          let dao_ = events[i]["returnValues"]["kaliDAO"];
          let name_ = events[i]["returnValues"]["name"];
          let docs_ = events[i]["returnValues"]["docs"];

          const instance = new web3.eth.Contract(abi, dao_);

          let members = await fetchMembers(instance);
          console.log(members);

          for (let m = 0; m < members.length; m++) {
            if (members[m]["member"].toLowerCase() == account.toLowerCase()) {
              daosThisChain.push({ dao: dao_, name: name_ });
              console.log("docs for this one", docs_);
            }
          }
        }
        allDaos[keys[j]] = daosThisChain;
      }

      setDaos(allDaos);
      value.setLoading(false);
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }
  }

  return (
    <Layout>
      {account == null ? (
        <Button className="transparent-btn" onClick={value.connect}>
          Connect to see your DAOs
        </Button>
      ) : (
        <>
          {daos == null
            ? null
            : daos.map((dao, key) => (
                <List key={key}>
                  <Heading as="h2">
                    {getNetworkName(key).replace(/^\w/, (s) => s.toUpperCase())}
                  </Heading>
                  {dao.map((item, index) => (
                    <ListItem key={index}>
                      <Link href={`../daos/${item.dao}`}>
                        <DaoCard name={item.name} dao={item.dao} />
                      </Link>
                    </ListItem>
                  ))}
                </List>
              ))}
        </>
      )}
    </Layout>
  );
}
