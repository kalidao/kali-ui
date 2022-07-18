import React from 'react'
import { useNetwork } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import DaoCard from './DaoCard'

export default function UserDAOs({ address }) {
  const { activeChain } = useNetwork()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: address,
  })
  const userDaos = data?.['members']

  return (
    <>
      {data &&
        !isLoading &&
        userDaos &&
        userDaos.map((dao) => <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={activeChain?.id.toString()} />)}
    </>
  )
}
