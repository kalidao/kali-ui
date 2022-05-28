import React from 'react'
import Ricardian from './Ricardian'
import { Flex, Text } from '../../../styles/elements'

export default function Docs({ info }) {
  return (
    <Flex gap="md" dir="col" css={{
      border: '1px solid $gray800',
      padding: '1rem'
    }}>
    {info["docs"] === "" ? <Ricardian /> : <Flex gap="md" align="separate">
        <Text>Docs</Text>
        <Text>{info["docs"]}</Text>
      </Flex>} 
  </Flex>
  )
}
