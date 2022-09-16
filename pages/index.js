import Layout from '../components/layout'
import { GRAPH_URL } from '../graph/url'
import { productionChains } from '../constants/productionChains'
import { Flex, Text } from '../styles/elements'
import { MyDAOs, NewDao, Search, Display, UserDAOs } from '../components/home/'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import CardTemplate from './CardTemplate'

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
        gap="md"
        css={{
          width: '100%',
          height: '100%',
          // background: 'Red',
          marginTop: '5rem',
          justifyContent: 'center',
          // gap: '20px',
        }}
      >
        <Flex
          dir="col"
          css={{
            width: '20%',
            alignItems: 'flex-start',
            // background: 'Blue',
            marginLeft: '2rem',
            // alignItems: 'center',
          }}
        >
          {/* <Flex css={{ background: 'Purple', width: '100%', alignItems: 'center' }}>
            <NewDao />
          </Flex> */}
          <Flex
            dir="col"
            css={{
              // background: 'Purple',
              height: '20%',
              marginTop: '1.5rem',
              alignItems: 'center',
            }}
          >
            <Flex
              dir="col"
              css={{
                marginTop: '1.5rem',
                // background: 'Orange',
                width: '100%',
                // marginLeft: '2rem',
                // justifyContent: 'center',
              }}
            >
              <Search daos={daos} setDisplay={setDisplay} />
              {hide ? (
                <Flex
                  dir="col"
                  css={{
                    // background: 'Red',
                    width: '100%',
                  }}
                >
                  <Display daos={display} />
                </Flex>
              ) : (
                <Flex
                  dir="col"
                  gap="md"
                  css={{
                    alignItems: 'flex-start',
                    paddingTop: '1.5rem',
                    marginLeft: 'rem',
                    width: '100%',
                    // background: 'Green',
                  }}
                >
                  <Text variant="instruction">Summon a Kali DAO</Text>
                  <Text variant="instruction">Search for Kali DAOs</Text>
                  <Text variant="instruction">Learn about Kali DAOs</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex
          dir="col"
          gap="md"
          css={{
            width: '70%',
            height: '100%',
            // background: 'Wheat',
            // minWidth: '75vw',
            // paddingTop: '1.5rem',
          }}
        >
          <Flex
            gap="md"
            css={{
              // marginTop: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '45%',
              // background: 'Green',
            }}
          >
            <CardTemplate />
            <CardTemplate />
            <CardTemplate />
          </Flex>

          <UserDAOs address={account?.address ? account?.address : '0x4744cda32bE7b3e75b9334001da9ED21789d4c0d'} />
        </Flex>
      </Flex>
    </Layout>
  )
}
