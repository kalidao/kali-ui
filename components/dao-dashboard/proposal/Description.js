import React from 'react'
import { Flex, Text } from '../../../styles/elements'

export default function Description({ description }) {
  return (
    <Flex css={{
      flexDirection: 'column',
      gap: '0.3rem'
    }}>
      <Text css={{
        color: '$gray500'
      }}>Description</Text>
        {description?.length > 0 ?
        <Text css={{
          color: '$gray100'
        }}>{description}</Text>: 
      <Text css={{
      color: '$gray300'
    }}>
      No description.
    </Text>}
    </Flex>
  )
}
