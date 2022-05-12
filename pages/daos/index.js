import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNetwork } from "wagmi";
import AllDAOs from "../../components/all-daos";
import { graph } from "../../constants/graph";
import NewDaoSquare from "../../components/my-daos/NewDaoSquare";

export default function DAOs() {
    const { activeChain } = useNetwork();
    const [daos, setDaos] = useState();

    useEffect(() => {
        fetchData();
      }, [activeChain]);
    
      async function fetchData() {
         try {
            const result = await fetch(graph[activeChain?.id], {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                query: `query {
                    daos(first: 1000) {
                      id
                      token {
                        name
                      }
                      members {
                        id
                      }
                    }
                  }`,
              }),
            }).then((res) => res.json());
    
            // sort by number of members
            const daos = result["data"]["daos"].sort((a, b) => b["members"].length - a["members"].length)
            setDaos(daos);
          } catch (e) {
            console.log('error', e);
          }
        }
        
  return (
    <Layout heading="All DAOs">
       <AllDAOs daos={daos} />
       <NewDaoSquare />
    </Layout>  
  );
}