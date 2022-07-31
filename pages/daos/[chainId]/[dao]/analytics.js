import React from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import { getDaoInfo } from '../../../../graph/queries'

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

export default function AnalyticsPage({ info, ricardian }) {
  console.log('res', info, ricardian)
  return <Layout heading={`Info`} content="Learn more about the DAO."></Layout>
}
