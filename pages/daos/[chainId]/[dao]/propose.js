import Layout from '../../../../components/dao-dashboard/layout/'
import { Flex, Button } from '../../../../styles/elements'
import { Label, Input } from '../../../../styles/form-elements'

export default function ProposePage() {
  return (
    <Layout heading={'Propose'} content="Create a proposal.">
      <Flex css={{
        padding: '20px',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        color: '$gray12',
        borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
        gap: '10px'
      }}>
        <Flex dir="col" gap="sm">
            <Label>Title</Label>
            <Input name="id" />
        </Flex>
        <Flex dir="col"  gap="sm">
            <Label>Description (Optional)</Label>
            <Input name="id" as="textarea" />
        </Flex>
        <Flex dir="col">
            <Button>On-Chain Execution +</Button>
        </Flex>
      </Flex>
    </Layout>
  )
}
