import { formatVotingPeriod } from '../../../../../utils/votingPeriod'
import { Flex } from '../../../../../styles/elements'
export default function VPeriod({ amount }) {
  return <Flex>This proposal will update the voting period to {formatVotingPeriod(amount)}</Flex>
}
