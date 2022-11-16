import React from 'react'
import Layout from '@components/dao-dashboard/layout'
import { getDaoInfo } from '@graph/queries'
import Info from '@components/dao-dashboard/info/index'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = context?.params?.dao as string
  const chainId = context?.params?.chainId

  const result = await getDaoInfo(chainId, address)

  return {
    props: {
      info: result['data']['daos'][0],
    },
  }
}

export default function InfoPage({ info }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title={`Info`} content="Learn more about the DAO.">
      <Info info={info} />
    </Layout>
  )
}
