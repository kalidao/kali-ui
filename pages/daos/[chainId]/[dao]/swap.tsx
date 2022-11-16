import Layout from '@components/dao-dashboard/layout'
import Crowdsale from '@components/dao-dashboard/crowdsale'
import { GRAPH_URL } from '@graph/url'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = context?.params?.dao as string
  const chainId = context?.params?.chainId

  try {
    const res = await fetch(GRAPH_URL[Number(chainId)], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          daos(where: {
            id: "${address}"
          }) {
            id
            token {
              name
              symbol
            }
            crowdsale {
              active
              version
              listId
              purchaseToken
              purchaseMultiplier
              purchaseLimit
              personalLimit
              saleEnds
              details
              amountPurchased
              purchase {
                purchaser
                purchased
              }
            }
          }
        }`,
      }),
    })
    const info = await res.json()

    return {
      props: {
        info: info?.data?.daos[0],
      },
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        info: null,
      },
    }
  }
}

export default function CrowdsalePage({ info }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Swap" content="Swap Eth or tokens">
      <Crowdsale info={info} />
    </Layout>
  )
}
