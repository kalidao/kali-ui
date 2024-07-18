import React from 'react'
import { ethers } from 'ethers'
import { User } from '@components/tools/User'
import { Card } from '@components/ui/card'
import { Check, X } from 'lucide-react'

type Props = {
  votes: any
}

export default function VotesView({ votes }: Props) {
  return (
    <div className="space-y-4">
      {votes?.map((vote: any) => (
        <Vote
          key={vote?.voter}
          address={vote?.voter}
          weight={ethers.utils.formatEther(vote?.weight)}
          vote={vote?.vote}
        />
      ))}
    </div>
  )
}

type VoteProps = {
  address: string
  weight: string
  vote: boolean
}

const Vote = ({ address, weight, vote }: VoteProps) => {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="w-20">
          <User address={address} />
        </div>
        <div className="w-10 flex items-center justify-center">{Number(weight).toFixed(2)}</div>
        <div className={`w-10 ${vote ? 'text-green-500' : 'text-red-500'}`}>
          {vote ? <Check size={20} /> : <X size={20} />}
        </div>
      </div>
    </Card>
  )
}
