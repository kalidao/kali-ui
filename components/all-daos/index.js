import React, { useEffect } from 'react'
import { Flex } from '../../styles/elements'
import { Results, ResultsText } from '../my-daos/'
import NewDao from '../my-daos/NewDao'
import DaoCard from '../my-daos/DaoCard'
import { useNetwork } from 'wagmi'
import { addresses } from '../../constants/addresses'

export default function AllDAOs({ daos, chainId }) {
  const { activeChain } = useNetwork()
  
  return (
    <>
      {daos !== undefined ? (
        <Flex dir="col" css={{ gap: '1rem', position: 'absolute', left: '8rem', top: '5rem', margin: '1rem' }}>
          {
            <ResultsText>
              {' '}
              There are {daos.length} DAOs on{' '}
              <ResultsText
                as="a"
                href={addresses[chainId]["blockExplorer"]}
                target="_blank"
                css={{
                  '&:hover': {
                    color: '$accent',
                  },
                }}
              >
                {addresses[chainId]["name"]}
              </ResultsText>
            </ResultsText>
          }
          <Results>
            {daos && daos.map((dao) => <DaoCard key={dao['id']} dao={dao} />)}
            <NewDao />
          </Results>
        </Flex>
      ) : null}
    </>
  )
}
