'use client'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'
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

  return <Timeline />
}

export default DashboardPage
