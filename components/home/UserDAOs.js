import React from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import DaoCard from './DaoCard'
import { AddressZero } from '@ethersproject/constants'
import { Box, Flex, Text } from '../../styles/elements'
import NewDao from './NewDao'

export default function UserDAOs() {
  const { address } = useAccount()
  const { activeChain } = useNetwork()
  const { data, isLoading } = useGraph(activeChain?.id, USER_DAOS, {
    address: address ? address : AddressZero,
  })
  const userDaos = data?.['members']

  console.log(data, isLoading, userDaos, address)

  return (
    <Flex
      dir="col"
      css={{
        borderRight: '1px solid $gray3',
        // minWidth: '12rem',
        // minHeight: '100vh',
      }}
    >
      <NewDao />

      <Flex css={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        {userDaos && userDaos.length == 0 ? (
          <Text variant="subheading">Summon a KaliDAO today!</Text>
        ) : (
          <Text variant="subheading">Your KaliDAOs:</Text>
        )}
      </Flex>
      {data &&
        !isLoading &&
        userDaos &&
        userDaos.map((dao) => (
          <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={activeChain?.id.toString()} side={true} />
        ))}
    </Flex>
  )
}
