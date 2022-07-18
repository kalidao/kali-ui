import React from 'react'
import { useNetwork, useAccount } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import Welcome from './Welcome'
import { Flex } from '../../styles/elements'
import { Results, ResultsText } from './index'
import DaoCard from './DaoCard'

export default function MyDAOs({ daos }) {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: account?.address,
  })

  return (
    <>
      {!account && <Welcome daos={daos} />}
      {daos && daos.length === 0 && <Welcome allDaos={allDaos && allDaos} />}
    </>
  )
}
