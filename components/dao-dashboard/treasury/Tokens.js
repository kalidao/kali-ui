import React from 'react'
import { Box } from "../../../styles/elements";
import Spinner from '../../structure/Spinner';
import TokenCard from './TokenCard';

export default function Tokens({ tokenBalance }) {
  return (
    <Box>
      {
        tokenBalance ? 
        tokenBalance.map(token => <TokenCard key={token.token_address} token={token} />) : 
        <Spinner />
      }
    </Box>
  )
}
