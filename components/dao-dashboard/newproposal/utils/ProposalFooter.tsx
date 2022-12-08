import { Stack, Button } from '@kalidao/reality'
import Back from '@design/proposal/Back'
import ChainGuard from '@components/dao-dashboard/ChainGuard'

type Props = {
  setProposal?: React.Dispatch<React.SetStateAction<string>>
  proposal: string
  submitProposal: () => void
  disabled?: boolean
  loading?: boolean
}

export const ProposalFooter = ({ setProposal, proposal, submitProposal, disabled, loading }: Props) => {
  return (
    <Stack align="center" justify={'space-between'} direction="horizontal">
      <Back onClick={() => setProposal?.(proposal)} />
      <ChainGuard fallback={<Button>Submit</Button>}>
        <Button onClick={submitProposal} disabled={disabled} loading={loading}>
          Submit
        </Button>
      </ChainGuard>
    </Stack>
  )
}
