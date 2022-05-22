import React from 'react'
import { Flex } from '../../styles/elements'
import { Results, ResultsText } from "../my-daos/"
import NewDao from '../my-daos/NewDao'
import DaoCard from '../my-daos/DaoCard'
import { useNetwork } from 'wagmi'

export default function AllDAOs({ daos, props }) {
  const { activeChain } = useNetwork();

  return (<>
    {daos !== undefined ?
        <Flex dir="col" css={{ gap: '1rem', position: 'absolute', left: '8rem', top: '5rem', margin: '1rem'}}>
          {<ResultsText> There are {daos.length} DAOs on {" "}
          <ResultsText as="a" href={activeChain?.blockExplorers?.default.url} target="_blank" css={{
            '&:hover': {
              color: '$accent'
            }
          }}>{activeChain.name}</ResultsText>
          </ResultsText>}
          <Results>
            {daos && daos.map(dao => <DaoCard key={dao["id"]} dao={dao} />)}
            <NewDao />
          </Results>
        </Flex> : 
      null 
    }
  </>)
}
     

