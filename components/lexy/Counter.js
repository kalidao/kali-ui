import React from 'react'
import Claim from './Claim'
import { useAccount } from 'wagmi'
import { Flex, Box, Button } from '../../styles/elements'

// a counter component that receieve a count prop
export default function Counter({ count }) {
  const { data: account } = useAccount()
  const claim = async () => {
    if (!account) return
  }

  return (
    <Flex
      css={{
        border: '1px solid $gray6',
        borderRadius: '20px',
        padding: '1rem',
        fontSize: '1.5rem',
        fontWeight: '800',
        background: '$gray3',
        color: '$gray11',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '6.5rem',
      }}
    >
      {count} KALI
      <Claim />
    </Flex>
  )
}
