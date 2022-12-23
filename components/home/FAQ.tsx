import { Box, Stack, Text, IconCheck, IconClose } from '@kalidao/reality'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@design/Accordion'
import Balancer from 'react-wrap-balancer'

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

export default function Confirmation() {
  return (
    <Stack align="center">
      <h2>
        <Balancer>FAQs</Balancer>
      </h2>
      <Accordion type="multiple" defaultValue="token" collapsible>
        <AccordionItem value="what">
          <AccordionTrigger>What is Kali?</AccordionTrigger>
          <AccordionContent>
            <Box padding="3">
              Kali is a no-code, no-lawyer platform to create orgs with full custody of their assets (DAOs) that can
              work with the real world through legal agreements.
            </Box>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="why">
          <AccordionTrigger>Why Kali?</AccordionTrigger>
          <AccordionContent>
            <Box padding="3">
              Kali is a complete governance stack. The ability to weave real world assets and agreements into smart
              contracts gives your team and community new powers: Send and receive funds to anyone; make limited
              liability businesses; bootstrap a more engaged community with tokens. All decisions are executed
              automatically with code.
            </Box>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="where">
          <AccordionTrigger>Where is this going?</AccordionTrigger>
          <AccordionContent>
            <Box padding="3">
              Blockchains are no longer a fringe technology but an important infrastructural change to how money is
              being handled online. Kali is designed to make your next project fluent with new kinds of assets, such as
              cryptocurrencies and NFTs, while allowing you to root ownership into law. Automation is at the core of the
              product — legal paperwork and code deployment is taken care of and fully transparent.
            </Box>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="how">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            <Box padding="3">
              To give you the most options as you grow, Kali embraces a minimalist, while powerful, set of smart
              contracts based on the Moloch and Compound Governor frameworks that can scale your project from a small
              club to an open protocol with millions of stakeholders. Membership rules are automated through the Kali
              software, including transferability, which at all times can be amended.
            </Box>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="codeslaw">
          <AccordionTrigger>Codeslaw?</AccordionTrigger>
          <AccordionContent>
            <Box padding="3">
              Kali radically reduces the complexity and costs of code and law. Designed by lawyers who implemented the
              first DAO LLC and non-profit structure (UNA) in collaboration with LexDAO, Metacartel and SeedClub, Kali
              legal structures help limit the liability of DAO members and enable more control of off-chain assets that
              “defer” to code through customized legal agreements. While Kali supports the creation of LLCs and other
              legal structures, including “bring your own”, it is an internet-first and code-centric platform. Members
              of a Kali DAO at all times own their assets through smart contracts. Legal extensions are optional, but
              should you decide to include them, Kali will make sure the paperwork is a breeze.
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Stack>
  )
}
