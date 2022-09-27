import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { IconArrowLeft, Button, Stack } from '@kalidao/reality'
import Layout from '@components/dao-dashboard/layout'
import ProposalView from '@components/dao-dashboard/proposal/page'
import { getProposal } from '@graph/queries'

const ProposalPage: NextPage = ({ proposal }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { dao, chainId } = router.query

  useEffect(() => {
    router.prefetch(`/daos/${chainId}/${dao}`)
  }, [chainId, dao, router])

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    router.push(`/daos/${chainId}/${dao}`)
  }

  return (
    <Layout heading={`Proposal #${proposal?.serial}`} content="Discuss and vote on the proposal.">
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
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = context?.params?.dao
  const proposalId = context?.params?.proposalId
  const chainId = context?.params?.chainId

  const result = await getProposal(chainId, address, proposalId)

  if (!result) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      proposal: result?.data?.proposals[0],
    },
  }
}

export default ProposalPage
