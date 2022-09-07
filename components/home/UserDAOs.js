import React from 'react'
import { useNetwork } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import DaoCard from './DaoCard'
import { AddressZero } from '@ethersproject/constants'
import { Box, Flex, Text } from '../../styles/elements'
import NewDao from './NewDao'
export default function UserDAOs({ address }) {
  const { activeChain } = useNetwork()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: address ? address : AddressZero,
  })
  const userDaos = data?.['members']

  console.log(data, isLoading, userDaos)

  return (
    <Flex
      dir="col"
      css={{
        borderRight: '1px solid $gray3',
        minWidth: '12rem',
        minHeight: '100vh',
      }}
    >
      <NewDao />

      {userDaos && userDaos.length == 0 ? (
        <Text variant="subheading">Summon a KaliDAO today!</Text>
      ) : (
        <Text variant="subheading">Your KaliDAOs:</Text>
      )}
      {data &&
        !isLoading &&
        userDaos &&
        userDaos.map((dao) => (
          <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={activeChain?.id.toString()} side={true} />
        ))}
    </Flex>
  )
}
