import React from 'react'
import { Stack, Text } from '@kalidao/reality'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export default function Error({ message }) {
  return (
    <Stack direction={'horizontal'} align={'flex-end'} justify={'center'}>
      <ExclamationTriangleIcon color="yellow" />
      <Text>{message}</Text>
    </Stack>
  )
}
