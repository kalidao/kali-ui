import { useStateMachine } from 'little-state-machine'

import { legalEntities } from '@constants/legalEntities'
import { Box, Stack, Text, IconCheck, IconClose } from '@kalidao/reality'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@design/Accordion'
import { ethers } from 'ethers'
import { formatVotingPeriod, votingPeriodToSeconds } from '@utils/index'
import { User } from '@components/tools/User'

const Row = ({ name, value }: { name: string | React.ReactNode; value: React.ReactNode }) => {
  return (
    <Box width="full" padding="3">
      <Stack direction="horizontal" align="center" justify={'space-between'}>
        {typeof name == 'string' ? <Text>{name}</Text> : name}
        <Text weight="bold">{value}</Text>
      </Stack>
    </Box>
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
          <Row name="Voting Period" value={`${typeof voting == 'number' ? formatVotingPeriod(voting) : 'Invalid'}`} />
          <Row
            name="Token Transferability"
            value={state.transferability === true ? <IconCheck color="green" /> : <IconClose color="red" />}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="apps">
        <AccordionTrigger>Apps</AccordionTrigger>
        <AccordionContent>
          <Row name="Tribute" value={<IconCheck color="green" />} />
          <Row name="Crowdsale" value={state.crowdsale ? <IconCheck color="green" /> : <IconClose color="red" />} />
          <Row name="Redemption" value={state.redemption ? <IconCheck color="green" /> : <IconClose color="red" />} />
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
                  state.docType == 'none' ? (
                    <IconClose color="red" />
                  ) : (
                    legalEntities[state.docType]['text']
                  )
                ) : (
                  <IconClose color="red" />
                )
              ) : (
                <IconClose color="red" />
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
