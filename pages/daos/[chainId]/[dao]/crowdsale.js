import Layout from '../../../../components/dao-dashboard/layout/'
import Crowdsale from '../../../../components/dao-dashboard/crowdsale/'
import { Spinner } from '../../../../components/elements/'
import { GRAPH_URL } from '../../../../graph'

export const getServerSideProps = async (context) => {
  const address = context.params.dao.toLowerCase()
  const chainId = context.params.chainId
  try {
    const res = await fetch(GRAPH_URL[chainId], {
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

export default function CrowdsalePage({ info }) {
  console.log('info', info)
  return (
    <Layout heading="Crowdsale">
      <Crowdsale info={info} />
    </Layout>
  )
}
