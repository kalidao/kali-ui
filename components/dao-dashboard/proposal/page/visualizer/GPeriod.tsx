import { formatVotingPeriod } from '../../../../../utils/votingPeriod'
import { Text } from '@kalidao/reality'

export default function GPeriod({ amount }: { amount: number }) {
  return <Text>This proposal will update voting period to {formatVotingPeriod(amount)}</Text>
}
