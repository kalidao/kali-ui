'use client'
import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Spinner } from '@components/ui/spinner'
import ProposalView from '@components/dao-dashboard/proposal/page'
import VotesView from '@components/dao-dashboard/proposal/page/VotesView'
import { useGetProposal } from '@graph/queries/getProposal'
import { Address } from 'viem'

export default function ProposalPage() {
  const router = useRouter()
  const params = useParams<{ chainId: string; dao: Address; proposalId: string }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address
  const proposalId = params ? Number(params.proposalId) : 0

  const { data: proposal, isLoading } = useGetProposal(Number(chainId), dao as string, proposalId)

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}`)
  }, [chainId, dao, router])

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`/daos/${chainId}/${dao}`)
  }

  return (
    <div className="p-2 lg:p-6">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <ProposalView proposal={proposal} />
          </div>
          <VotesView votes={proposal?.votes} />
        </div>
      )}
    </div>
  )
}
