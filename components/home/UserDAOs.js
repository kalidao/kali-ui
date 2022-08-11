import React from 'react'
import { useNetwork } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import DaoCard from './DaoCard'
import { AddressZero } from '@ethersproject/constants'
import { Flex } from '../../styles/elements'
import NewDao from './NewDao'
export default function UserDAOs({ address }) {
  const { activeChain } = useNetwork()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: address ? address : AddressZero,
  })
  const userDaos = data?.['members']

  return (
    <Flex
      dir="col"
      css={{
        borderRight: '1px solid $gray3',
        minWidth: '10rem',
        minHeight: '100vh',
      }}
    >
      {data &&
        !isLoading &&
        userDaos &&
        userDaos.map((dao) => (
          <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={activeChain?.id.toString()} side={true} />
        ))}
      <NewDao />
    </Flex>
  )
}
