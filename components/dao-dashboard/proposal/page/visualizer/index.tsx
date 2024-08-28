import React from 'react'
import Member from './Member'
import Extension from './Extension'
import Call from './Call'
import Internal from './Internal'
import { useParams } from 'next/navigation'
import { formatVotingPeriod } from '@utils/votingPeriod'
import { Users, Code, Hand, Flag, Coins, Zap, AlertCircle, FilePlus } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { Address } from 'viem'

export default function Visualizer({ proposal }: { proposal: any }) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const dao = params?.dao as Address

  let heading, icon, component
  switch (proposal?.proposalType) {
    case 'MINT':
      heading = 'Add Member'
      icon = <Users className="h-5 w-5" />
      component = <Member accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case 'BURN':
      heading = 'Remove Member'
      icon = <Users className="h-5 w-5" />
      component = <Member accounts={proposal?.accounts} amounts={proposal?.amounts} />
      break
    case 'CALL':
      heading = 'Contract Call'
      icon = <Code className="h-5 w-5" />
      component = <Call accounts={proposal?.accounts} amounts={proposal?.amounts} payloads={proposal?.payloads} />
      break
    case 'VPERIOD':
      heading = 'Update Voting Period'
      icon = <Hand className="h-5 w-5" />
      component = (
        <Internal
          message={`This proposal will update voting period to ${formatVotingPeriod(Number(proposal?.amounts?.[0]))}`}
          type={proposal?.proposalType}
          dao={dao?.toString()}
          chainId={Number(chainId)}
        />
      )
      break
    case 'GPERIOD':
      heading = 'Update Grace Period'
      icon = <Hand className="h-5 w-5" />
      component = <Internal type={proposal?.proposalType} message="This proposal will update the grace period." />
      break
    case 'QUORUM':
      heading = 'Update Participation Required'
      icon = <Flag className="h-5 w-5" />
      component = (
        <Internal
          type={proposal?.proposalType}
          message={`This proposal will update quorum to ${proposal?.amounts?.[0]}%`}
        />
      )
      break
    case 'SUPERMAJORITY':
      heading = 'Update Approval Required'
      icon = <Users className="h-5 w-5" />
      component = (
        <Internal
          type={proposal?.proposalType}
          message={`This proposal will update supermajority to ${proposal?.amounts?.[0]}%`}
        />
      )
      break
    case 'TYPE':
      heading = 'Update Voting Types'
      icon = <Flag className="h-5 w-5" />
      component = <Internal type={proposal?.proposalType} message={`This proposal will update the voting type.`} />
      break
    case 'PAUSE':
      heading = 'Update Token Transferability'
      icon = <Coins className="h-5 w-5" />
      component = (
        <Internal
          message={`This proposal will flip transferability.`}
          type={proposal?.proposalType}
          dao={dao?.toString()}
          chainId={Number(chainId)}
        />
      )
      break
    case 'EXTENSION':
      heading = 'Update Extension'
      icon = <Zap className="h-5 w-5" />
      component = <Extension accounts={proposal?.accounts} amounts={proposal?.amounts} payloads={proposal?.payloads} />
      break
    case 'ESCAPE':
      heading = 'Delete'
      icon = <AlertCircle className="h-5 w-5" />
      component = (
        <Internal
          type={proposal?.proposalType}
          chainId={Number(chainId)}
          dao={dao?.toString()}
          amount={proposal?.amounts?.[0]}
          message={`This will remove the proposal ${proposal?.amounts?.[0]} from the queue.`}
        />
      )
      break
    case 'DOCS':
      heading = 'Update Docs'
      icon = <FilePlus className="h-5 w-5" />
      component = (
        <Internal
          message={`This proposal will update the docs.`}
          amount={proposal?.description}
          type={proposal?.proposalType}
        />
      )
      break
  }

  return (
    <Card className="max-w-full md:max-w-[256px]">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <span className="text-foreground">{icon}</span>
          <h3 className="text-lg font-medium">{heading}</h3>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">{component}</CardContent>
    </Card>
  )
}
