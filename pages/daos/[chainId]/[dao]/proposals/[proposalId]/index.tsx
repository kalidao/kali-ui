import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Spinner } from '@components/ui/spinner'
import Layout from '@components/dao-dashboard/layout'
import ProposalView from '@components/dao-dashboard/proposal/page'
import VotesView from '@components/dao-dashboard/proposal/page/VotesView'
import { getProposal } from '@graph/queries'
import { useGetProposal } from '@graph/queries/getProposal'

const ProposalPage: NextPage = () => {
  const router = useRouter()
  const { dao, chainId, proposalId } = router.query
  const { data: proposal, isLoading } = useGetProposal(Number(chainId), dao as string, proposalId as string)

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}`)
  }, [chainId, dao, router])

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push(`/daos/${chainId}/${dao}`)
  }

  return (
    <Layout title={`Proposal #${proposalId}`} content="Discuss and vote on the proposal.">
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
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = context?.params?.dao
  const proposalId = context?.params?.proposalId
  const chainId = context?.params?.chainId

  const result = await getProposal(Number(chainId), address as string, proposalId as string)

  if (!result) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      proposal: result,
    },
  }
}

export default ProposalPage
