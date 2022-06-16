import React from 'react'
import { Box } from '../../../styles/elements'
import { Spinner } from '../../elements/'
import TokenCard from './TokenCard'

export default function Tokens({ tokenBalance }) {
  return (
    <Box>
      {tokenBalance ? (
        tokenBalance.length > 0 ? (
          tokenBalance.map((token) => <TokenCard key={token.token_address} token={token} />)
        ) : (
          'There are no Tokens in this DAO :('
        )
      ) : (
        <Spinner />
      )}
    </Box>
  )
}
