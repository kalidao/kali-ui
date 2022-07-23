import React from 'react'
import { useAccount } from 'wagmi'
import Welcome from './Welcome'
import { Flex } from '../../styles/elements'
import UserDAOs from './UserDAOs'

export default function MyDAOs({ daos }) {
  const { data: account } = useAccount()

  return (
    <Flex css={{
      position: 'absolute',
      top: '25%',
      right: '25%',
      left: '25%',

      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      gap: '20px',
  
      '@media (max-width: 540px)': {
        flexDirection: 'column-reverse',
        top: '7rem',
      },

      '@media (max-width: 840px)': {
        flexDirection: 'column-reverse',
        top: '7rem',
      },
    }}>
      <Welcome daos={daos} />
      <Flex css={{
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
        }
      }}>
        {account && <UserDAOs address={account?.address} />}
      </Flex>
    </Flex>
  )
}
