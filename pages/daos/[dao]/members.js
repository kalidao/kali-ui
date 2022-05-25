import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from "../../../components/dao-dashboard/layout/"
import { getDaoChain } from '../../../utils'
import Members from '../../../components/dao-dashboard/members'
import { DAO_MEMBERS } from "../../../graph/"
import { useQuery } from "@apollo/client";
import Spinner from '../../../components/structure/Spinner'
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { GRAPH_URL } from '../../../graph/url'
export default function MembersPage() { 
  const router = useRouter();
  const daoAddress = router.query.dao
  const daoChain = getDaoChain(daoAddress)
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
