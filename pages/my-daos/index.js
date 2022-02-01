import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import LayoutApp from "../../components/structure/LayoutApp";
import { Button, List, ListItem, Text, Box } from "@chakra-ui/react";
import { factoryInstance } from "../../eth/factory";
import { addresses } from "../../constants/addresses";

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
      const myDaos = [];

      let keys = Object.keys(addresses);

      let size = keys.length;

      for(let j=0; j < size; j++) {

        let address = addresses[keys[j]]["factory"];

        const factory = factoryInstance(address, web3);

        const events = await factory.getPastEvents("DAOdeployed", {
          fromBlock: 0,
          toBlock: "latest",
        });

        const myDaosThisChain = [];

        for(let i=0; i < events.length; i++) {

          let dao_ = events[i]["returnValues"]["kaliDAO"];

          let name_ = events[i]["returnValues"]["name"];

          let voters = events[i]["returnValues"]["voters"];

          for(let v=0; v < voters.length; v++) {

            if(voters[v].toLowerCase() == account.toLowerCase()) {

              let item = { dao: dao_, name: name_ };

              myDaosThisChain.push(item);
            }
          }
        }
        myDaos[keys[j]] = myDaosThisChain;
      }
      setDaos(myDaos);
      value.setLoading(false);
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }
  }

  return (
    <LayoutApp>
        {account == null ?
        <Button onClick={value.connect}>Connect to see your DAOs</Button>
        :
        <>
        {daos == null ? null :
        daos.map((dao, key) => (
        <List key={key}>
          <Text>Chain {key}</Text>
          {dao.map((item, index) => (
            <ListItem key={index}>{item.name} ({item.dao})</ListItem>
          ))}
        </List>
        ))}
        </>
        }
    </LayoutApp>
  );
}
