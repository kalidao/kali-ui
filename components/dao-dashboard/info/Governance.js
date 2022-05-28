import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import { convertVotingPeriod } from '../../../utils/formatters'
export default function Governance({ info }) {
  return (
    <Flex gap="md" dir="col" css={{
        border: '1px solid $gray800',
        padding: '1rem',
      }}>
        <Text variant="heading">Rules</Text>
        <Flex gap="md" align="separate">
          <Text>Voting Period</Text>
          <Text>{convertVotingPeriod(info["votingPeriod"])}</Text>
          {/* TODO: Add etherscan link */}
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Participation Needed</Text>
          <Text>{info["quorum"]}%</Text>
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Approval Needed</Text>
          <Text>{info["supermajority"]}%</Text>
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Token Transferable</Text>
          <Text>{info["paused"] ? "YES" : "NO"}</Text>
        </Flex>
        <Flex gap="md" align="separate">
          <Text>Grace Period</Text>
          <Text>{info["gracePeriod"]}</Text>
        </Flex>
      </Flex>
  )
}
