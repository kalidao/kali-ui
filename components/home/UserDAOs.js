import React from 'react'
import { useNetwork } from 'wagmi'
import { useGraph } from '../hooks/useGraph'
import { USER_DAOS } from '../../graph'
import DaoCard from './DaoCard'
import { AddressZero } from '@ethersproject/constants'
import { Flex } from '../../styles/elements'
import NewDao from './NewDao'
import { useRouter } from 'next/router'
export default function UserDAOs({ address }) {
  const { activeChain } = useNetwork()
  const { data, isLoading } = useGraph(5, USER_DAOS, {
    address: address ? address : AddressZero,
  })
  const userDaos = data?.['members']
  console.log(data, address, activeChain?.id)

  return (
    <Flex
      dir="col"
      css={{
        width: '100%',
        height: '100%',
      }}
    >
      {data &&
        !isLoading &&
        userDaos &&
        userDaos.map((dao) => (
          <DaoCard key={dao['dao']['id']} dao={dao['dao']} chain={activeChain?.id.toString()} side={false} />
        ))}
      {/* <NewDao /> */}
    </Flex>
  )
}
