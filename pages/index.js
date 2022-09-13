import Layout from '../components/layout'
import { GRAPH_URL } from '../graph/url'
import { productionChains } from '../constants/productionChains'
import { Flex, Text } from '../styles/elements'
import { MyDAOs, NewDao, Search, Display, UserDAOs } from '../components/home/'
import { useEffect, useState } from 'react'
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
  const [hide, setHide] = useState(false)
  const [chain, setChain] = useState('1')

  console.log(display)

  useEffect(() => {
    if (daos[1].length != display.length) {
      console.log('hi')
      setHide(true)
    }
  }, [display])
  return (
    <Layout heading="Home" content="Create or join a Kali DAO.">
      <Flex
        css={{
          width: '100%',
          height: '100%',
          background: 'Red',
          marginTop: '5rem',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Flex dir="col" css={{ width: '30%', alignItems: 'flex-start', background: 'Blue', marginLeft: '2rem' }}>
          <Flex css={{ background: 'Purple', width: '100%', justifyContent: 'center' }}>
            <NewDao />
          </Flex>

          <Flex dir="col" css={{ background: 'Purple', width: '100%', height: '20%', justifyContent: 'center' }}>
            <Search daos={daos} setDisplay={setDisplay} />
            {hide ? (
              <Display daos={display} />
            ) : (
              <Flex
                dir="col"
                gap="md"
                css={{ alignItems: 'center', paddingTop: '1.5rem', width: '100%', background: 'Green' }}
              >
                <Text>Summon a KaliDAO</Text>
                <Text>Search for KaliDAOs</Text>
                <Text>Learn about KaliDAOs</Text>
              </Flex>
            )}
          </Flex>
        </Flex>

        <Flex
          dir="col"
          gap="md"
          css={{
            width: '20%',
            background: 'Wheat',
            // minWidth: '75vw',
            // paddingTop: '1.5rem',
          }}
        >
          <UserDAOs address={account?.address} />
        </Flex>
      </Flex>
    </Layout>
  )
}
