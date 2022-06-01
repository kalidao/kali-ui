import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from "../../../../components/dao-dashboard/layout/"
import Members from '../../../../components/dao-dashboard/members'
import { DAO_MEMBERS } from "../../../../graph/"
import { useGraph } from '../../../../components/hooks'

export default function MembersPage() { 
  const router = useRouter();
  const daoAddress = router.query.dao
  const daoChain = router.query.chainId
  const { data } = useGraph(daoChain, DAO_MEMBERS, {
    dao: daoAddress }
   );
  const members = data && data['daos'][0]
  // if (loading) return "Loading..."
 return (
    <Layout heading={`Members`}>
        <Members members={members} />
    </Layout>
  )
}
