import React from 'react'
import { Flex, Text } from '../../../styles/elements'

export default function Description({ description }) {
  return (
    <Flex
      css={{
        flexDirection: 'column',
        gap: '0.3rem',
      }}
    >
      {description?.length > 0 ? (
        <Text
          css={{
            fontFamily: 'Regular',
            color: '$gray12',
          }}
        >
          {description}
        </Text>
      ) : (
        <Text
          css={{
            color: '$gray300',
          }}
        >
          No description.
        </Text>
      )}
    </Flex>
  )
}
