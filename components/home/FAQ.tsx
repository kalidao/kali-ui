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
  const faq = [
    {
      key: 'what-is-dao',
      question: 'What is a DAO?',
      answer:
        'DAOs are code-based organizations. Members of DAOs use tokens to represent their voting weight and ownership. Blockchains guarantee voting outcomes will be executed automatically. This makes it easier to trust other DAO members and rules without needing to know their identity. These features make DAOs better for online communities where traditional organizing and paperwork would only slow things down.',
    },
    {
      key: 'what-is-kali',
      question: 'What is Kali?',
      answer:
        'Kali is a no-code, no-lawyer platform to create DAOs that can work with the real world through legal agreements and limited liability. While optional, these unique features allow Kali DAOs to move better between internet and IRL ownership and have more complete governance without relying on legal intermediaries.',
    },
    {
      key: 'how-does-kali-compare',
      question: 'How does Kali compare to other DAO tools?',
      answer:
        'Kali is an optimized fork of Moloch V3 that combines a token (ERC20), treasury and voting system into a single contract. This saves gas (as much as 10x!) and reduces complexity as compared to other DAO deployers, such as Aragon, Daohaus (Moloch V2), Tally (Governor Bravo) and Colony.',
    },
    {
      key: 'is-code-audited',
      question: 'Is the code audited?',
      answer:
        'Yes, two rounds of security audits were completed by BlockApex. Even better, Kali DAOs have been in production for a year without any issues.',
    },
    {
      key: 'how-kali-legal',
      question: 'How does the legal stuff work?',
      answer:
        'Kali provides DAOs with vetted legal templates to form and register LLCs, non-profits and "bring your own" legal entities. If users select a Kali entity, they will install an NFT into their DAO that represents their legal structure, which makes it easier to understand for other applications.',
    },
    {
      key: 'who-kali',
      question: 'Who built Kali?',
      answer:
        'The Kali DAO contracts and legal framework were developed by LexDAO.',
    },
  ]
  return (
    <Stack align="center">
      <h2>
        <Balancer>FAQs</Balancer>
      </h2>
      <Accordion type="multiple" defaultValue="token" collapsible={true}>
        {faq.map((item) => (
          <Item key={item.key} value={item.key} title={item.question} content={item.answer} />
        ))}
      </Accordion>
    </Stack>
  )
}

const Item = ({ value, title, content }: { value: string; title: string; content: string }) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <Box padding="3" color="foreground">
          {content}
        </Box>
      </AccordionContent>
    </AccordionItem>
  )
}
