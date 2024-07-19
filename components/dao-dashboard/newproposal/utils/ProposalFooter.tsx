import { Button } from '@components/ui/button'
import { ArrowLeft } from 'lucide-react'
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
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={() => setProposal?.(proposal)} className="flex items-center">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <ChainGuard fallback={<Button>Submit</Button>}>
        <Button onClick={submitProposal} disabled={disabled} className={loading ? 'cursor-not-allowed opacity-50' : ''}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </ChainGuard>
    </div>
  )
}
