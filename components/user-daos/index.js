import React, { useState, useEffect } from 'react'
import { Flex } from '../../styles/elements'
import { Results, ResultsText } from '../my-daos/'
import { useNetwork } from 'wagmi'
import { GRAPH_URL } from '../../graph'
import DaoCard from '../my-daos/DaoCard'

export default function UserDAOs({ address }) {
  const { activeChain } = useNetwork()
  const [daos, setDaos] = useState([])

  useEffect(() => {
    fetchData()
  }, [activeChain])

  async function fetchData() {
    try {
      const result = await fetch(GRAPH_URL[activeChain?.id], {
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

  return (
    <>
      {daos != undefined ? (
        <Flex dir="col" css={{ gap: '1rem', position: 'absolute', left: '8rem', top: '5rem', margin: '1rem' }}>
          {daos.length > 1 ? (
            <ResultsText> They are are in {daos.length} DAOs </ResultsText>
          ) : daos.length === 1 ? (
            <ResultsText>They are in {daos.length} DAO</ResultsText>
          ) : (
            <ResultsText>They are not in any DAO!</ResultsText>
          )}
          <Results>{daos && daos.map((dao) => <DaoCard key={dao['dao']['id']} dao={dao['dao']} />)}</Results>
        </Flex>
      ) : null}
    </>
  )
}
