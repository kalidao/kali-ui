import React from 'react'
import { Box, Text } from '../../../styles/elements'

export default function Description({ description }) {
  return (
    <Box>
        {description?.length > 0 ?
        <Text css={{
          color: '$gray100'
        }}>{description}</Text>: 
      <Text css={{
      color: '$gray300'
    }}>
      No description.
    </Text>}
    </Box>
  )
}
