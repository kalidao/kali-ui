import Layout from '@components/dao-dashboard/layout'
import { GRAPH_URL } from '@graph/url'
import MembersClient from './members'

async function getData(params: { dao: string; chainId: string }) {
  const address = params.dao.toLowerCase()
  const chainId = parseInt(params.chainId)
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
    members: data?.data.daos[0],
    votes: data?.data.votes,
    proposals: data?.data.proposals,
  }
}

export default async function MembersPage({ params }: { params: { dao: string; chainId: string } }) {
  const { members, votes, proposals } = await getData(params)

  return (
    <Layout title={`Members`} content="Look at the members and their analytics for the DAO.">
      <MembersClient members={members} votes={votes} proposals={proposals} />
    </Layout>
  )
}
