import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import { Spinner } from '../../elements'
import Info from '../../../styles/Info'
import { useRouter } from 'next/router'
import { getProposals } from '../../../graph/queries'
import { getMembers } from '../../../graph/queries'
import { useEffect, useState } from 'react'

export default function Engagement({ info }) {
  const router = useRouter()
  const daoChain = Number(router.query.chainId)
  const daoAddress = router.query.dao

  //this is the number of votes that each of the current members have cast
  const [voted, setVoted] = useState(0)
  //this is the number of proposals that members have skipped
  const [didNotVote, setDidNotVote] = useState(0)
  //this is the number of proposals that members have voted on
  const [pending, setPending] = useState(0)
  const [passed, setPassed] = useState(0)
  const [failed, setFailed] = useState(0)

  const fetchData = async () => {
    const proposals = await getProposals(daoChain, daoAddress)
    const members = await getMembers(daoChain, daoAddress)

    let passed = 0
    let failed = 0
    let pending = 0
    for (const proposal of proposals.data.daos[0].proposals) {
      if (proposal.status === null) {
        pending++
      } else if (proposal.status) {
        passed++
      } else {
        failed++
      }

      setPassed(passed)
      setFailed(failed)
      setPending(pending)
    }

    let voted = 0
    let didNotVote = 0

    for (const member of members.data.daos[0].members) {
      for (const proposal of proposals.data.daos[0].proposals) {
        if (proposal.status !== null) {
          let found = false
          // console.log('debug (miss +1) - ', member.address, proposal)
          for (const vote of proposal.votes) {
            if (vote.voter === member.address.toLowerCase()) {
              found = true

              // console.log('debug (counted +1) - ', vote.voter, member.address, proposal)
            }
          }
          if (!found) {
            didNotVote++
          } else {
            voted++
          }
        }
      }
    }
    setVoted(voted)
    setDidNotVote(didNotVote)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Info heading="Analytics">
      {info ? (
        <Flex gap="md" dir="col">
          <Flex gap="md" align="separate">
            <Text># of Proposals</Text>
            <Text>{pending + failed + passed}</Text>
          </Flex>
          {/* <Flex gap="md" align="separate">
            <Text># of Pending Proposals</Text>
            <Text>{pending}</Text>
          </Flex> */}
          <Flex gap="md" align="separate">
            <Text># of Passed Proposals</Text>
            <Text>{passed}</Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Proposal Pass % </Text>
            <Text>{((passed / (passed + failed)) * 100).toFixed(2)}%</Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>Member Participation %</Text>
            <Text>{((voted / (voted + didNotVote)) * 100).toFixed(2)}%</Text>
          </Flex>
          {/* <Flex gap="md" align="separate">
            <Text>DAO HP</Text>
            <Text>{(voted * ((voted / (voted + didNotVote)) * 100).toFixed(2)) / 100}</Text>
          </Flex>
          <Flex gap="md" align="separate">
            <Text>DAO Total HP</Text>
            <Text>{voted + didNotVote}</Text>
          </Flex> */}
        </Flex>
      ) : (
        <Spinner />
      )}
    </Info>
  )
}
