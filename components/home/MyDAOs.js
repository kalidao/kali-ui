import React from 'react'
import { useNetwork, useAccount } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import Welcome from './Welcome'
import { Flex } from '../../styles/elements'
import { Results, ResultsText } from './index'
import DaoCard from './DaoCard'
import ActivityLog from './ActivityLog'

export default function MyDAOs({ allDaos }) {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: account?.address,
  })
  const daos = data?.['members']

  return (
    <>
      <Flex
        dir="col"
        css={{
          gap: '1rem',
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '7rem',
          justifyContent: 'center',
        }}
      >
        {daos &&
          (daos.length > 1 ? (
            <ResultsText> You are in {daos.length} DAOs </ResultsText>
          ) : (
            daos.length === 1 && <ResultsText>You are in {daos.length} DAO</ResultsText>
          ))}
        <Results>{daos && daos.map((dao) => <DaoCard key={dao['dao']['id']} dao={dao['dao']} />)}</Results>
        <ActivityLog allDaos={allDaos && allDaos} />
      </Flex>
      {!account && !daos && <Welcome allDaos={allDaos && allDaos} />}
      {daos && daos.length === 0 && <Welcome allDaos={allDaos && allDaos} />}
    </>
  )
}
