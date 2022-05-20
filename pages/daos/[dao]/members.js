import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { NewProposalSquare } from '../../../components/dashboard'
import Layout from '../../../components/layout'
import { getDaoChain } from '../../../utils'
import Members from '../../../components/dashboard/members'
import { graph } from "../../../constants/graph";

export default function MembersPage() {
  const router  = useRouter()
  const daoAddress = router.query.dao
  const [daoChain, setDaoChain] = useState();
  const [members, setMembers] = useState();

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
  }, [daoChain])

  return (
    <Layout heading={`Members: ${members ? members?.token?.name : ''}`}>
        <Members members={members} />
        {/* <NewProposalSquare /> */}
    </Layout>
  )
}
