import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from "../../../../components/dao-dashboard/layout/"
import Members from '../../../../components/dao-dashboard/members'
import { DAO_MEMBERS } from "../../../../graph/"
import { useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { GRAPH_URL } from '../../../../graph/url'

export default function MembersPage() { 
  const router = useRouter();
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { loading, error, data } = useQuery(DAO_MEMBERS, {
    variables: { dao: daoAddress },
    // client: new ApolloClient({
    //   uri: GRAPH_URL[daoChain],
    //   cache: new InMemoryCache()
    // })
  });
  
  // if (loading) return "Loading..."
  if (!error) return (
    <Layout heading={`Members`}>
        <Members members={data && data['daos'][0]} />
    </Layout>
  )
}
