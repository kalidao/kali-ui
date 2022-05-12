import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDaoChain } from "../../utils/";
import Layout from "../../components/layout";
import { NewProposalSquare, Dashboard } from "../../components/dashboard/"
import graph from "../../constants/graph";

export default function Dao() {
  // const value = useContext(AppContext);
  // const { visibleView, daoChain, account } = value.state;
  // console.log("account", account);
  // * get DAO address from route * //
  const router = useRouter();
  const address = router.query.dao 

  const daoAddress = router.query.dao;
  const [daoChain, setDaoChain] = useState(null);
  // const dao = useContract({
  //   addressOrName: '0xf8b7d9ce43d6168bcc82d8e5204c8f545707fa7a',
  //   contractInterface: kaliDaoABI
  // })

  useEffect(() => {
    async function fetchData() {
      const chainId = await getDaoChain(daoAddress)
      setDaoChain(chainId)
    }
    fetchData();
  }, [daoAddress])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(graph[daoChain], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query {
                daos(where: {
                  id: "${account.address}}"
                }) {
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
        // const daos = result["data"]["daos"].sort((a, b) => b["members"].length - a["members"].length) 
        // setDaos(daos);
      } catch (e) {
        console.log('error', e);
      }
    }
    
    fetchData()
  }, [])

  return (
    <Layout heading="DAO">
      <NewProposalSquare />
      <Dashboard />
    </Layout>
  );
}
