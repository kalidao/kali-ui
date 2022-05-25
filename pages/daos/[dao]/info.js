import { useRouter } from 'next/router'
import React from 'react'
import Layout from "../../../components/dao-dashboard/layout/"
import { getDaoChain } from '../../../utils'
import { Flex } from '../../../styles/elements'
import { getTokenName } from '../../../utils/fetchTokenInfo'

export default function InfoPage() {
  const router  = useRouter()
  const daoAddress = router.query.dao
  const daoChain = getDaoChain(daoAddress);
  const daoName = getTokenName(daoChain, daoAddress);
 
  return (
    <Layout heading={`Info: ${daoName}`}>
        <Flex>
            
        </Flex>
    </Layout>
  )
}
