import React from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import { Flex } from '../../../../styles/elements'
import { GRAPH_URL } from '../../../../graph'
import { getDaoInfo } from '../../../../graph/queries'
import Info from '../../../../components/dao-dashboard/info/index'

export const getServerSideProps = async (context) => {
  const address = context.params.dao
  const chainId = context.params.chainId
  const result = await getDaoInfo(chainId, address)

  return {
    props: {
      info: result['data']['daos'][0],
    },
  }
}

export default function InfoPage({ info, ricardian }) {
  console.log('res', info, ricardian)
  return (
    <Layout heading={`Info`} content="Learn more about the DAO.">
      <Info info={info} />
    </Layout>
  )
}
