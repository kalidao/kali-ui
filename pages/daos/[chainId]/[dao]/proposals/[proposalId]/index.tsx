import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Box, IconArrowLeft, Button, Stack, Spinner } from '@kalidao/reality'
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
      <Box
        padding={{
          xs: '2',
          lg: '6',
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack space="10">
            <Stack
              direction={{
                xs: 'vertical',
                lg: 'horizontal',
              }}
            >
              <Button variant="transparent" shape="circle" onClick={goBack}>
                <IconArrowLeft />
              </Button>
              <ProposalView proposal={proposal} />
            </Stack>
            <VotesView votes={proposal?.votes} />
          </Stack>
        )}
      </Box>
    </Layout>
  )
}

export default ProposalPage
