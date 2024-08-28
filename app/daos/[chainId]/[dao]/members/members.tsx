'use client'
import { MembersList, MemberProfile } from '@components/dao-dashboard/members'
import React, { useState, useMemo, useEffect } from 'react'

export default function MembersClient({ members, votes, proposals }: { members: any; votes: any[]; proposals: any[] }) {
  const [member, setMember] = useState(members?.members[0])

  const list = useMemo(
    () =>
      members?.members
        .sort((a: { shares: number }, b: { shares: number }) => b.shares - a.shares)
        .filter((p: { shares: number }) => p.shares > 0),
    [members],
  )

  const memberVotes = useMemo(() => votes.filter((p: { voter: any }) => p.voter == member?.address), [votes, member])

  const memberProposals = useMemo(
    () => proposals.filter((p: { proposer: any }) => p.proposer == member?.address),
    [proposals, member],
  )

  useEffect(() => {
    setMember(list[0])
  }, [list])

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-x-2">
      <MembersList members={list} active={member} setActive={setMember} />
      <div className="max-w-screen">
        <MemberProfile
          member={member}
          proposals={memberProposals}
          // @ts-ignore
          votes={memberVotes}
          totalSupply={members?.token?.totalSupply}
        />
      </div>
    </div>
  )
}
