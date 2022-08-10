import Layout from '../components/layout'
import { MyDAOs, NewDao } from '../components/home'
import { GRAPH_URL } from '../graph/url'
import { productionChains } from '../constants/productionChains'
import { Flex } from '../styles/elements'
import { Search, Display } from '../components/home/'

export const getServerSideProps = async () => {
  try {
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
  } catch (e) {
    console.log('error', e)
  }
}

export default function HomePage({ daos }) {
  const toDisplay = daos[1]

  return (
    <Layout heading="Home" content="Create or join a Kali DAO.">
      <Flex css={{
        marginTop: '6rem',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Search daos={daos} />
        <NewDao />
      </Flex>
      <Display daos={toDisplay} />
    </Layout>
  )
}
