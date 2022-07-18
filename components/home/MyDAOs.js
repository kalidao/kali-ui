import React from 'react'
import { useAccount } from 'wagmi'
import Welcome from './Welcome'
import { Flex } from '../../styles/elements'
import UserDAOs from './UserDAOs'

export default function MyDAOs({ daos }) {
  const { data: account } = useAccount()

  return (
    <Flex dir="row">
      <Welcome daos={daos} />
      <Flex
        css={{
          position: 'absolute',
          top: '7rem',
          right: '1.5rem',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {account && <UserDAOs address={account?.address} />}
      </Flex>
    </Flex>
  )
}
