import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNetwork } from "wagmi";
import AllDAOs from "../../components/all-daos";
import NewDaoSquare from "../../components/my-daos/NewDaoSquare";
import { useQuery } from "@apollo/client";
import { ALL_DAOS } from "../../graph";

export default function DAOs() {
  const { activeChain } = useNetwork();
  const { loading, error, data } = useQuery(ALL_DAOS);
  
  return (
    <Layout heading="All DAOs">
      {!error && <AllDAOs daos={data && data["daos"]} chainId={activeChain?.chainId} />}
       <NewDaoSquare />
    </Layout>  
  );
}