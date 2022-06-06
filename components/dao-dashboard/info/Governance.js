import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import { formatVotingPeriod } from "../../../utils/"
import Info from '../../../styles/Info'
import { Spinner } from '../../elements'

export default function Governance({ info }) {
  return (
    <Info heading={'Rules'}>
      {info !== undefined ? (
        <Flex gap="md" dir="col">
          <Flex gap="md" align="separate">
            <Text>Voting Period</Text>
            <Text>{formatVotingPeriod(info['votingPeriod'])}</Text>
            {/* TODO: Add etherscan link */}
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Participation Needed</Text>
            <Text>{info['quorum']}%</Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Approval Needed</Text>
            <Text>{info['supermajority']}%</Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Token Transferable</Text>
            <Text>{info['token']['paused'] ? 'NO' : 'YES'}</Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Grace Period</Text>
            <Text>{info['gracePeriod']}</Text>
          </Flex>
        </Flex>
      ) : (
        <Spinner />
      )}
    </Info>
  )
}
