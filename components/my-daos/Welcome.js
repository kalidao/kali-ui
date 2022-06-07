import React from 'react'
import { Box, Text } from '../../styles/elements'

export default function Welcome() {
  return (
    <Box css={{
        border: '1px solid #fff',
        padding: '1rem',
        position: 'absolute',
        top: '10%',
        bottom: '0',
        right: '0',
        left: '25%'
    }}>
        <Text css={{
          fontFamily: "Screen", 
          fontSize: '36px'
        }}>Heading</Text>
        <Text css={{
          fontFamily: "Screen", 
          fontSize: '12px'
        }}>
            Welcome Message
        </Text>
    </Box>
  )
}
