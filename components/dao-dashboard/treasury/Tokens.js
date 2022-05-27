import React from 'react'
import { Box } from "../../../styles/elements";
import TokenCard from './TokenCard';

export default function Tokens({ tokenBalance }) {
  return (
    <Box>
      {
        tokenBalance && tokenBalance.map(token => <TokenCard key={token.token_address} token={token} />)
      }
    </Box>
  )
}
