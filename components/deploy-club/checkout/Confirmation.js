import { useStateMachine } from 'little-state-machine'

import { Flex, Text } from '../../../styles/elements'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../styles/elements/Accordion'

import { GearIcon, PersonIcon } from '@radix-ui/react-icons'

const Row = ({ name, value }) => {
  return (
    <Flex
      dir="row"
      align="separate"
      css={{
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
    <Accordion type="single" defaultValue="settings" collapsible>
      <AccordionItem value="settings">
        <AccordionTrigger>
          <Flex
            css={{
              gap: '8px',
            }}
          >
            <GearIcon />
            Settings
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          <Row name="Name" value={state.name} />
          <Row name="Quorum" value={`${state.quorum}`} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="signers">
        <AccordionTrigger>
          <Flex
            css={{
              gap: '8px',
            }}
          >
            <PersonIcon />
            Signers
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          {state.signers.map((signer, index) => (
            <Row key={index} name={`${index}`} value={signer.address} />
          ))}
        </AccordionContent>
      </AccordionItem>
      {/* <AccordionItem value="apps">
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
      </AccordionItem> */}
      {/* <AccordionItem value="legal">
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
      </AccordionItem> */}
    </Accordion>
  )
}
