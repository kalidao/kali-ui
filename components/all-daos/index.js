import React from 'react'
import { Flex } from '../../styles/elements'
import { Results, ResultsText } from '../my-daos/'
import DaoCard from '../my-daos/DaoCard'
import { addresses } from '../../constants/addresses'

export default function AllDAOs({ daos, chainId }) {
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
                href={addresses[chainId]['blockExplorer']}
                target="_blank"
                css={{
                  '&:hover': {
                    color: '$accent',
                  },
                }}
              >
                {addresses[chainId]['name']}
              </ResultsText>
            </ResultsText>
          }
          <Results>{daos && daos.map((dao) => <DaoCard key={dao['id']} dao={dao} chain={chainId} />)}</Results>
        </Flex>
      ) : null}
    </>
  )
}
