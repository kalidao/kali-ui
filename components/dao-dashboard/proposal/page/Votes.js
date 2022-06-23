import React from 'react'
import { Flex } from '../../../../styles/elements'
import Info from '../../../../styles/Info'
import VoteCard from './VoteCard'
import { Table, Row, Heading, Data } from '../../../../styles/Table'

export default function Votes({ votes }) {
  return (
    <Info
      heading={
        <Flex gap="sm" align="separate">
          Votes
          <Flex
            css={{
              background: '$violet2',
              color: '$mauve11',
              height: '25px',
              width: '25px',
              padding: '0.3rem',
              fontSize: '18px',
              border: '1px solid $violet6',
              borderRadius: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Regular',
            }}
          >
            {votes?.length}
          </Flex>
        </Flex>
      }
    >
      <Table>
        <thead>
          <Row>
            <Heading>Voter</Heading>
            <Heading>Vote</Heading>
            <Heading>Balance</Heading>
          </Row>
        </thead>
        {votes && votes.map((vote) => <VoteCard key={vote.id} vote={vote} />)}
      </Table>
    </Info>
  )
}
