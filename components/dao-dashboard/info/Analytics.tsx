import React from 'react'
import { useRouter } from 'next/router'
import { getProposals } from '../../../graph/queries'
import { getMembers } from '../../../graph/queries'
import { useEffect, useState } from 'react'
import { Card, Stack, Text, Spinner } from '@kalidao/reality'

export default function Engagement() {
  const router = useRouter()
  const daoChain = Number(router.query.chainId)
  const daoAddress = router.query.dao as string

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

  console.log(pending, passed, failed, voted, didNotVote)
  const analytics = [
    {
      title: '# of Proposals',
      value: pending + passed + failed,
    },
    {
      title: '# of Pending Proposals',
      value: pending,
    },
    {
      title: '# of Passed Proposals',
      value: passed,
    },
    {
      title: 'Proposal Pass %',
      value: `${((passed / (passed + failed)) * 100).toFixed(2)}%`,
    },
    {
      title: 'Member Participation %',
      value: `${((voted / (voted + didNotVote)) * 100).toFixed(2)}%`,
    },
    {
      title: 'DAO Total HP',
      value: `${voted + didNotVote}`,
    },
  ]

  return (
    <Card padding="6">
      <Stack>
        {analytics?.map((item, index) => {
          return (
            <Stack key={index} direction="horizontal" justify="space-between" align="center">
              <Text>{item.title}</Text>
              <Text weight="bold">{item.value}</Text>
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
}
