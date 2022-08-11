import Layout from '../components/layout'
import { GRAPH_URL } from '../graph/url'
import { productionChains } from '../constants/productionChains'
import { Flex } from '../styles/elements'
import { MyDAOs, NewDao, Search, Display, UserDAOs } from '../components/home/'
import { useState } from 'react'
import { useAccount } from 'wagmi'

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
  const { data: account } = useAccount()
  const [display, setDisplay] = useState(daos[1])
  const [chain, setChain] = useState('1')

  return (
    <Layout heading="Home" content="Create or join a Kali DAO.">
      <Flex
        css={{
          marginTop: '5rem',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <UserDAOs address={account?.address} />
        <Flex
          dir="col"
          gap="md"
          css={{
            minWidth: '75vw',
            paddingTop: '1.5rem',
          }}
        >
          <Search daos={daos} setDisplay={setDisplay} />
          <Display daos={display} />
        </Flex>
      </Flex>
    </Layout>
  )
}
