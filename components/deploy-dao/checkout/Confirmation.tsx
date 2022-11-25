import { GlobalState, useStateMachine } from 'little-state-machine'

import { legalEntities } from '@constants/legalEntities'
import { Box, Stack, Text } from '@kalidao/reality'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@design/Accordion'

import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { useEnsName } from 'wagmi'
import { truncateAddress } from '@utils/truncateAddress'
import { ethers } from 'ethers'

const formatVotingPeriodUnit = (unit: string) => {
  switch (unit) {
    case 'day': {
      return 'Days'
    }
    case 'hour': {
      return 'Hours'
    }
    case 'min': {
      return 'Minutes'
    }
  }
}

const Row = ({ name, value }: { name: string; value: React.ReactNode }) => {
  return (
    <Box width="full" padding="3">
      <Stack direction="horizontal" align="center" justify={'space-between'}>
        <Text>{name}</Text>
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
  const { data: ensName, isSuccess } = useEnsName({
    address: member,
  })

  const name = ensName ? ensName?.toString() : truncateAddress(member)
  console.log('name', member, name, truncateAddress(member))
  return <Row name={name} value={ethers.utils.formatEther(ethers.utils.parseEther(shares))} />
}

export default function Confirmation() {
  const { state } = useStateMachine()
  console.log('state', state)
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
          <Row name="Voting Period" value={`${state.votingPeriod} ${formatVotingPeriodUnit(state.votingPeriodUnit)}`} />
          <Row
            name="Token Transferability"
            value={state.transferability === true ? <CheckIcon color="green" /> : <Cross1Icon color="red" />}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="apps">
        <AccordionTrigger>Apps</AccordionTrigger>
        <AccordionContent>
          <Row name="Tribute" value={<CheckIcon color="green" />} />
          <Row name="Crowdsale" value={state.crowdsale ? <CheckIcon color="green" /> : <Cross1Icon color="red" />} />
          <Row name="Redemption" value={state.redemption ? <CheckIcon color="green" /> : <Cross1Icon color="red" />} />
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
                  legalEntities[state.docType]['text']
                ) : (
                  <Cross1Icon color="red" />
                )
              ) : (
                <Cross1Icon color="red" />
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
