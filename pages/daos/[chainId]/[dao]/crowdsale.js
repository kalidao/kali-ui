import React, { useEffect } from 'react'
import Layout from '../../../components/dao-dashboard/layout/'
import useSWR from "swr";
import { useRouter } from 'next/router';
import { CROWDSALE } from '../../../graph/dao-queries';
import { useQuery } from '@apollo/client';
import Crowdsale from "../../../components/dao-dashboard/crowdsale/";

export default function CrowdsalePage() {
  const router = useRouter();
  const daoAddress = router.query.dao;
  const { loading, error, data } = useQuery(CROWDSALE, {
    variables: { dao: daoAddress },
    // client: new ApolloClient({
    //   uri: GRAPH_URL[daoChain],
    //   cache: new InMemoryCache()
    // })
  });
  
  return (
      <Layout heading="Crowdsale">
          {data && <Crowdsale crowdsale={data["crowdsales"][0]} />}
      </Layout>    
  )
}
