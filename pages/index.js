import Layout from '../components/layout'
import { MyDAOs, NewDaoSquare } from '../components/home'
import { GRAPH_URL } from '../graph/url'
import { productionChains } from '../constants/productionChains'

export const getServerSideProps = async () => {
  const result = await Promise.all(
    productionChains.map((chain) =>
      fetch(GRAPH_URL[chain], {
        method: 'POST',
        body: JSON.stringify({
          query: `query {
        daos(orderBy: birth, orderDirection: desc) {
          birth
          id
          token {
            name
          }
          members {
            id
          }
        }
      }`,
        }),
      }).then((res) => res.json()),
    ),
  )

  // creating a new object with all daos and their chainId
  const daos = {
    1: result[0].data.daos,
    137: result[1].data.daos,
    42161: result[2].data.daos,
    10: result[3].data.daos,
  }

  return {
    props: {
      daos: daos,
    },
  }
}

export default function HomePage({ daos }) {
  return (
    <Layout heading="Decentra">
      <MyDAOs allDaos={daos && daos} />
      <NewDaoSquare />
    </Layout>
  )
}
