import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import { Box, Stack } from '@kalidao/reality'
import { useContractRead } from 'wagmi'
import DAO_ABI from '@abi/DAO'
import Proposals from '@components/dao-dashboard/proposals/'

const ProposalsPage: NextPage = () => {
  const router = useRouter()
  const { chainId, dao } = router.query
  const { data } = useContractRead({
    addressOrName: dao as string,
    contractInterface: DAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}/`)
  }, [chainId, dao, router])

  return (
    <Layout title={data ? `${data.toString()}} Proposals` : 'Proposals'} content="Create or vote on a proposal.">
      <Proposals />
    </Layout>
  )
}

export default ProposalsPage
