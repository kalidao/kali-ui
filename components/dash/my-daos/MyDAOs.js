import { useEffect, useState } from "react";
import { useNetwork, useAccount } from "wagmi";
import { graph } from "../../../constants/graph";
import { styled } from "../../../styles/stitches.config";
import DaoCard from "./DaoCard";
import NewDao from "./NewDao";

const ResultsText = styled('div', {
  // TODO: Add font Monument Grotesk
  fontSize: '18px',
  lineHeight: '100%',
  fontWeight: '500',
  marginBottom: '0.6rem'
});

const Results = styled('div', {
  display: 'flex',
  gap: '1rem'
});

export default function MyDAOs() {
  const { activeChain } = useNetwork();
  const { data: account } = useAccount();
  const [daos, setDaos] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeChain, account]);

  async function fetchData() {
     try {
        const result = await fetch(graph[activeChain?.id], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query {
              members(where: {
                address: "${account?.address}"
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

        console.log('result', result["data"]["members"]);
        setDaos(result["data"]["members"]);
        
      } catch (e) {
        console.log('error', e);
      }
    }

  return (
    <div>
        <ResultsText>Viewing {daos.length} results</ResultsText>
        <Results>
          {daos && daos.map(dao => <DaoCard dao={dao["dao"]} />)}
          <NewDao />
        </Results>
    </div>
  )
}

