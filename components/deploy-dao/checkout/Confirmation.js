import { useStateMachine } from 'little-state-machine'

// import formatVotingPeriodUnit from './formatVotingPeriodUnit'
import { Flex, Text } from '../../../styles/elements'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../styles/elements/Accordion'

import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { GiToken } from 'react-icons/gi'
import { RiGovernmentFill, RiAppsFill } from 'react-icons/ri'
import { GoLaw } from 'react-icons/go'

const formatVotingPeriodUnit = (unit) => {
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

const Row = ({ name, value }) => {
  return (
    <Flex
      dir="row"
      align="separate"
      css={{
        boxShadow: 'rgba(10, 10, 10, 0.9) 1px 1px 6px 0px inset, rgba(10, 10, 10, 0.9) -1px -1px 6px 1px inset',
        padding: '0.5rem',
      }}
    >
      <Text>{name}</Text>
      <Text>{value}</Text>
    </Flex>
  )
}

export default function Confirmation() {
  const { state } = useStateMachine()

  return (
    <Accordion type="single" defaultValue="token" collapsible>
      <AccordionItem value="token">
        <AccordionTrigger>
          <Flex
            css={{
              gap: '8px',
            }}
          >
            <GiToken />
            Token
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          <Row name="Name" value={state.name} />
          <Row name="Symbol" value={state.symbol} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="gov">
        <AccordionTrigger>
          <Flex
            css={{
              gap: '8px',
            }}
          >
            <RiGovernmentFill />
            Governance
          </Flex>
        </AccordionTrigger>
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
        <AccordionTrigger>
          <Flex
            css={{
              gap: '8px',
            }}
          >
            <RiAppsFill />
            Apps
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          <Row name="Tribute" value={<CheckIcon color="green" />} />
          <Row name="Crowdsale" value={state.crowdsale ? <CheckIcon color="green" /> : <Cross1Icon color="red" />} />
          <Row name="Redemption" value={state.redemption ? <CheckIcon color="green" /> : <Cross1Icon color="red" />} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="legal">
        <AccordionTrigger>
          <Flex
            css={{
              gap: '8px',
            }}
          >
            <GoLaw />
            Legal
          </Flex>
        </AccordionTrigger>
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
    </Accordion>
  )
}
