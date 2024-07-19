import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Card } from '@components/ui/card'
import { getProposals, getMembers } from '../../../graph/queries'

export default function Engagement() {
  const router = useRouter()
  const daoChain = Number(router.query.chainId)
  const daoAddress = router.query.dao as string

  const [voted, setVoted] = useState(0)
  const [didNotVote, setDidNotVote] = useState(0)
  const [pending, setPending] = useState(0)
  const [passed, setPassed] = useState(0)
  const [failed, setFailed] = useState(0)

  const fetchData = useCallback(async () => {
    const proposals = await getProposals(daoChain, daoAddress)
    const { members } = await getMembers(daoChain, daoAddress)

    let passedCount = 0
    let failedCount = 0
    let pendingCount = 0

    for (const proposal of proposals) {
      if (proposal.status === null) {
        pendingCount++
      } else if (proposal.status) {
        passedCount++
      } else {
        failedCount++
      }
    }

    setPassed(passedCount)
    setFailed(failedCount)
    setPending(pendingCount)

    let votedCount = 0
    let didNotVoteCount = 0

    for (const member of members) {
      for (const proposal of proposals) {
        if (proposal.status !== null) {
          const found = proposal.votes.some((vote) => vote.voter === member.address.toLowerCase())
          if (found) {
            votedCount++
          } else {
            didNotVoteCount++
          }
        }
      }
    }

    setVoted(votedCount)
    setDidNotVote(didNotVoteCount)
  }, [daoAddress, daoChain])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
      value: voted + didNotVote,
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {analytics?.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.title}</span>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
