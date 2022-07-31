import React from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import { Button, Flex } from '../../../../styles/elements'
import Back from '../../../../styles/proposal/Back'
import { getDaoInfo } from '../../../../graph/queries'
import Info from '../../../../components/dao-dashboard/info/index'
import { useRouter } from 'next/router'

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

export default function SettingsPage({ info, ricardian }) {
  const router = useRouter()
  console.log('res', info, ricardian)
  return (
    <Layout heading={`Info`} content="Learn more about the DAO.">
      <Flex></Flex>
    </Layout>
  )
}
