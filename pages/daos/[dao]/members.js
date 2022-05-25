import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Layout from "../../../components/dao-dashboard/layout/"
import { getDaoChain } from '../../../utils'
import Members from '../../../components/dao-dashboard/members'
import { graph } from "../../../constants/graph";
import { getTokenName } from '../../../utils/fetchTokenInfo'

export default function MembersPage() {
  const router  = useRouter()
  const daoAddress = router.query.dao
  const daoChain = getDaoChain(daoAddress);
  const daoName = getTokenName(daoChain, daoAddress);
  const [members, setMembers] = useState();

  useEffect(() => {
    if (!daoAddress || !daoChain) return 
    async function fetchData() {
      try {
        const result = await fetch(graph[daoChain], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query {
                daos(where: {
                  id: "${daoAddress}"
                }) {
                  token {
                    name
                  }
                  members {
                    address
                    shares
                  }
                }
              }`,
          }),
        }).then((res) => res.json());
        
        setMembers(result["data"]["daos"][0])
      } catch (e) {
        console.log('error', e);
      }
    }
    
    fetchData()
  }, [])

  return (
    <Layout heading={`Members: ${daoName}`}>
        <Members members={members} />
    </Layout>
  )
}
