import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import { Spinner } from '../../elements'
import Info from '../../../styles/Info'

export default function Extensions({ info }) {
  return (
    <Info heading="Extensions">
      {info ? (
        <Flex gap="md" dir="col">
          <Flex gap="md" align="separate">
            <Text>Tribute</Text>
            <Text>
              {info['tribute'] === null ? 'Inactive' : info['tribute']['active'] === true ? 'Active' : 'Inactive'}
            </Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Redemption</Text>
            <Text>
              {info['redemption'] === null ? 'Inactive' : info['redemption']['active'] === true ? 'Active' : 'Inactive'}
            </Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Crowdsale</Text>
            <Text>
              {info['crowdsale'] === null ? 'Inactive' : info['crowdsale']['active'] === true ? 'Active' : 'Inactive'}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Spinner />
      )}
    </Info>
  )
}
