import React from 'react'
import { getDaoInfo } from '@graph/queries'
import Info from '@components/dao-dashboard/info/index'

interface PageProps {
  params: {
    chainId: string
    dao: string
  }
}

async function getDAOInfo(chainId: number, address: string) {
  const result = await getDaoInfo(chainId, address)
  return result['data']['daos'][0]
}

export default async function InfoPage({ params }: PageProps) {
  const address = params.dao
  const chainId = Number(params.chainId)

  const info = await getDAOInfo(chainId, address)

  return <Info info={info} />
}
