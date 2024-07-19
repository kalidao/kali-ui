import React, { useState, useMemo, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { MembersList, MemberProfile } from '@components/dao-dashboard/members'
import { GRAPH_URL } from '@graph/url'

const MembersPage: NextPage = ({
  members,
  votes,
  proposals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [member, setMember] = useState(members[0])

  const list = useMemo(
    () =>
      members?.members
        .sort((a: { shares: number }, b: { shares: number }) => b.shares - a.shares)
        .filter((p: { shares: number }) => p.shares > 0),
    [members],
  )

  const memberVotes = useMemo(() => votes.filter((p: { voter: any }) => p.voter == member?.address), [votes, member])

  const memberProposals = useMemo(
    () => proposals.filter((p: { proposer: any }) => p.proposer == member?.address),
    [proposals, member],
  )

  useEffect(() => {
    setMember(list[0])
  }, [list])

  return (
    <Layout title={`Members`} content="Look at the members and their analytics for the DAO.">
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-2">
        <MembersList members={list} active={member} setActive={setMember} />
        <div className="max-w-screen">
          <MemberProfile
            member={member}
            proposals={memberProposals}
            votes={memberVotes}
            totalSupply={members?.token?.totalSupply}
          />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = (context?.params?.dao as string).toLowerCase()
  const chainId = context?.params?.chainId as unknown as number
  const res = await fetch(GRAPH_URL[chainId], {
    method: 'POST',
    body: JSON.stringify({
      query: `query {
          daos(where: {
            id: "${address}"
          }) {
              id
              members {
                  address
                  shares
                  proposals {
                    id
                  }
                }
                token {
                  totalSupply
                }
          }
          votes(where: {
            dao: "${address}"
          }) {
            voter
            vote
          }
          proposals(where: {
            dao: "${address}"
          }) {
            proposer
          }
        }`,
    }),
  })
  const data = await res.json()

  return {
    props: {
      members: data?.data.daos[0],
      votes: data?.data.votes,
      proposals: data?.data.proposals,
    },
  }
}

export default MembersPage
