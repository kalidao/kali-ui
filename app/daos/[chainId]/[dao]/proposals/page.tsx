'use client'
import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useParams, useRouter } from 'next/navigation'
import { useReadContract } from 'wagmi'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import Proposals from '@components/dao-dashboard/proposals/'
import { Address } from 'viem'

const ProposalsPage: NextPage = () => {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  const { data } = useReadContract({
    address: dao as `0xstring`,
    abi: KALIDAO_ABI,
    functionName: 'name',
    chainId: Number(chainId),
  })

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}/`)
  }, [chainId, dao, router])

  return <Proposals />
}

export default ProposalsPage
