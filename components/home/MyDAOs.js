import React from 'react'
import { useAccount } from 'wagmi'
import Search from './Search'
import { Flex } from '../../styles/elements'
import UserDAOs from './UserDAOs'

export default function MyDAOs({ daos }) {
  const { data: account } = useAccount()

  return (
    <Flex
      css={{
        position: 'fixed',
        flexDirection: 'column',
        gap: '10px',

        '@media (max-width: 840px)': {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto',
        },

        '@media (max-width: 540px)': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gridTemplateRows: 'auto',
        },
      }}
    >
      {account && <UserDAOs address={account?.address} />}
    </Flex>
  )
}
