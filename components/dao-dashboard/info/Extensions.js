import React from 'react'
import { Flex, Text } from '../../../styles/elements'

export default function Extensions({ info }) {
  return (
    <Flex gap="md" dir="col" css={{
      border: '1px solid $gray800',
      padding: '1rem'
    }}>
      <Text variant="heading">Extensions</Text>
      {info["tribute"]["active"] === true ? 
      <Flex gap="md" align="separate">
        <Text>Tribute</Text>
        <Text>Active</Text>
      </Flex> : 
      <Flex gap="md" align="separate">
        <Text>Tribute</Text>
        <Text>Inactive</Text>
      </Flex>}
      {info["redemption"]["active"] === true ? 
      <Flex gap="md" align="separate">
        <Text>Redemption</Text>
        <Text>Active</Text>
      </Flex> : 
      <Flex gap="md" align="separate">
        <Text>Redemption</Text>
        <Text>Inactive</Text>
      </Flex>
      }
      {info["crowdsale"] != null && info["crowdsale"]["active"] === true ? 
      <Flex gap="md" align="separate">
        <Text>Crowdsale</Text>
        <Text>Active</Text>
      </Flex> : 
      <Flex gap="md" align="separate">
        <Text>Crowdsale</Text>
        <Text>Inactive</Text>
      </Flex>}
  </Flex>
  )
}
