import React from 'react'
import { Flex } from '../elements'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
export default function Error({ message }) {
  return (
    <Flex
      gap="sm"
      css={{
        background: '$red500',
        padding: '0.5rem',
        borderRadius: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontWeight: '800',
      }}
    >
      <ExclamationTriangleIcon color="yellow" />
      {message}
    </Flex>
  )
}
