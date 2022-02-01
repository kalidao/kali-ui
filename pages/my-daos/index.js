import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import Layout from "../../components/structure/Layout";
import { Button, List, ListItem, Text, Box } from "@chakra-ui/react";
import { factoryInstance } from "../../eth/factory";
import { addresses } from "../../constants/addresses";
import { fetchMembers } from "../../utils/fetchDaoInfo";
const abi = require("../../abi/KaliDAO.json");

export default function MyDaos() {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [daos, setDaos] = useState(null);

  const testArray = {4: "test", 8: "test"};

  useEffect(() => {
    fetchData();
  }, [account]);

  async function fetchData() {
    value.setLoading(true);

    try {
      const allDaos = [];

      let keys = Object.keys(addresses);

      let size = keys.length;

      for(let j=0; j < size; j++) { // loop thru chains

        let address = addresses[keys[j]]["factory"];

        const factory = factoryInstance(address, web3);

        const events = await factory.getPastEvents("DAOdeployed", {
          fromBlock: 0,
          toBlock: "latest",
        });

        const daosThisChain = [];

        for(let i=0; i < events.length; i++) {

          let dao_ = events[i]["returnValues"]["kaliDAO"];

          const instance = new web3.eth.Contract(abi, dao_);

          let members = await fetchMembers(instance);
          console.log(members)

          for(let m=0; m < members.length; m++) {
            if(members[m]['member'].toLowerCase() == account.toLowerCase()) {
              daosThisChain.push(dao_);
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
        {account == null ?
        <Button onClick={value.connect}>Connect to see your DAOs</Button>
        :
        <>
        {daos == null ? null :
        daos.map((dao, key) => (
        <List key={key}>
          <Text>Chain {key}</Text>
          {dao.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
        ))}
        </>
        }
    </Layout>
  );
}
