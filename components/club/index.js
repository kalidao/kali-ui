import React from 'react'
import Profile from './Profile'
import { Box } from '../../styles/elements'
import { NewTransactionSquare } from './NewTransactionSquare'

export default function Club({ club }) {   
  return (
    <Box css={{
        position: 'absolute',
        top: '5rem'
    }}>
        <Profile />
        <NewTransactionSquare />
    </Box>
  )
}
