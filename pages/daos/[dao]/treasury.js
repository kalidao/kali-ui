import { useRouter } from 'next/router'
import React from 'react'
import Layout from "../../../components/dao-dashboard/layout/"
import { getDaoChain } from '../../../utils'
import { graph } from "../../../constants/graph";
import { Flex } from '../../../styles/elements'
import { getTokenName } from '../../../utils/fetchTokenInfo'

export default function MembersPage() {
  const router  = useRouter()
  const daoAddress = router.query.dao
  const daoChain = getDaoChain(daoAddress);
  const daoName = getTokenName(daoChain, daoAddress);

  return (
    <Layout heading={`Treasury: ${daoName}`}>
        <Flex>
            
        </Flex>
    </Layout>
  )
}
