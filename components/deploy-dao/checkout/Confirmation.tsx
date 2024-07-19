import React from 'react'
import { useStateMachine } from 'little-state-machine'
import { legalEntities } from '@constants/legalEntities'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion'
import { Check, X } from 'lucide-react'
import { ethers } from 'ethers'
import { formatVotingPeriod, votingPeriodToSeconds } from '@utils/index'
import { User } from '@components/tools/User'

const Row = ({ name, value }: { name: string | React.ReactNode; value: React.ReactNode }) => {
  return (
    <div className="w-full p-3">
      <div className="flex items-center justify-between">
        {typeof name === 'string' ? <span>{name}</span> : name}
        <span className="font-bold">{value}</span>
      </div>
    </div>
  )
}

type FounderProps = {
  member: string
  shares: string
}

const Founder = ({ member, shares }: FounderProps) => {
  return <Row name={<User address={member} />} value={ethers.utils.formatEther(ethers.utils.parseEther(shares))} />
}

export default function Confirmation() {
  const { state } = useStateMachine()
  console.log('state', state)
  const voting = votingPeriodToSeconds(state.votingPeriod, state.votingPeriodUnit)

  return (
    <Accordion type="single" defaultValue="token" collapsible>
      <AccordionItem value="token">
        <AccordionTrigger>Token</AccordionTrigger>
        <AccordionContent>
          <Row name="Name" value={state.name} />
          <Row name="Symbol" value={state.symbol} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="gov">
        <AccordionTrigger>Governance</AccordionTrigger>
        <AccordionContent>
          <Row name="Participation Needed" value={`${state.quorum}%`} />
          <Row name="Approval Needed" value={`${state.approval}%`} />
          <Row name="Voting Period" value={`${typeof voting === 'number' ? formatVotingPeriod(voting) : 'Invalid'}`} />
          <Row
            name="Token Transferability"
            value={
              state.transferability === true ? <Check className="text-green-500" /> : <X className="text-red-500" />
            }
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="apps">
        <AccordionTrigger>Apps</AccordionTrigger>
        <AccordionContent>
          <Row name="Tribute" value={<Check className="text-green-500" />} />
          <Row
            name="Crowdsale"
            value={state.crowdsale ? <Check className="text-green-500" /> : <X className="text-red-500" />}
          />
          <Row
            name="Redemption"
            value={state.redemption ? <Check className="text-green-500" /> : <X className="text-red-500" />}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="legal">
        <AccordionTrigger>Legal</AccordionTrigger>
        <AccordionContent>
          <Row
            name="Structure"
            value={
              state.hardMode ? (
                state.legal ? (
                  state.docType === 'none' ? (
                    <X className="text-red-500" />
                  ) : (
                    legalEntities[state.docType]['text']
                  )
                ) : (
                  <X className="text-red-500" />
                )
              ) : (
                <X className="text-red-500" />
              )
            }
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="members">
        <AccordionTrigger>Member</AccordionTrigger>
        <AccordionContent>
          {state.founders.map((founder, index) => (
            <Founder key={index} member={founder.member} shares={founder.share} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
