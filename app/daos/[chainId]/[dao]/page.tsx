'use client'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'
import Layout from '@components/dao-dashboard/layout'
import { useReadContract } from 'wagmi'
import { Address } from 'viem'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import Timeline from '@components/dao-dashboard/timeline'

const DashboardPage: NextPage = () => {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { data } = useReadContract({
    address: dao as Address,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  return (
    <Layout title={data ? data.toString() : 'Dashboard'} content="Create or vote on a proposal.">
      <Timeline />
    </Layout>
  )
}

export default DashboardPage
