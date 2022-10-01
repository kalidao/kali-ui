import React, { useState, useEffect } from 'react'
import { Flex } from '../../styles/elements'
import { useNetwork } from 'wagmi'
import { GRAPH_URL } from '@graph/index'
import DaoCard from '../home/DaoCard'
import { Text } from '@kalidao/reality'

type Props = {
  address: string
}

export default function UserDAOs({ address }: Props) {
  const { chain: activeChain } = useNetwork()
  const [daos, setDaos] = useState([])

  useEffect(() => {
    fetchData()

    async function fetchData() {
      if (activeChain) {
        try {
          const result = await fetch(GRAPH_URL[activeChain.id], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `query {
                members(where: {
                  address: "${address.toLowerCase()}"
                }) {
                  dao {
                    id
                    token {
                      name
                    }
                  }
                }
              }`,
            }),
          }).then((res) => res.json())

          console.log('result', result)
          setDaos(result['data']['members'])
        } catch (e) {
          return new Error('Not a valid url.')
        }
      }
    }
  }, [activeChain, address])

  return (
    <>
      {daos != undefined ? (
        <Flex dir="col" css={{ gap: '1rem', position: 'absolute', left: '8rem', top: '5rem', margin: '1rem' }}>
          {daos.length > 1 ? (
            <Text> They are are in {daos.length} DAOs </Text>
          ) : daos.length === 1 ? (
            <Text>They are in {daos.length} DAO</Text>
          ) : (
            <Text>They are not in any DAO!</Text>
          )}
          <div>
            {daos &&
              daos.map((dao) => <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={Number(activeChain?.id)} />)}
          </div>
        </Flex>
      ) : null}
    </>
  )
}
