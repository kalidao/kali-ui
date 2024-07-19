import { GRAPH_URL } from '../url'

interface Proposal {
  id: string
}

interface Member {
  address: string
  shares: number
  proposals: Proposal[]
}

interface Token {
  totalSupply: number
}

interface DAO {
  id: string
  members: Member[]
  token: Token
}

interface GetMembersResponse {
  data: {
    daos: DAO[]
  }
}

export const getMembers = async (
  chainId: number,
  address: string,
): Promise<{
  members: Member[]
  totalSupply: number
}> => {
  try {
    const res = await fetch(GRAPH_URL[chainId], {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            daos(where: {
              id: "${address.toLowerCase()}"
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
          }`,
      }),
    })

    const data: GetMembersResponse = await res.json()
    return {
      members: data.data.daos[0].members,
      totalSupply: data.data.daos[0].token.totalSupply,
    }
  } catch (e) {
    throw e
  }
}
