import { formatVotingPeriod } from '../../../../../utils/votingPeriod'
import { Stack, Card, Text } from '@kalidao/reality'

export default function VPeriod({ amount }) {
  return (
    <Card padding="6">
      <Stack direction="horizontal">
        <Text>This proposal will update voting period to: </Text>
        <Text color="green">{formatVotingPeriod(amount)}</Text>
      </Stack>
    </Card>
  )
}
