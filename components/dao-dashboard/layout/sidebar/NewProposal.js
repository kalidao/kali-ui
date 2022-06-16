import { Dialog, DialogTrigger, DialogContent, DialogClose } from '../../../../styles/Dialog'
import { Box } from '../../../../styles/elements'
import { NewProposalModal } from '../../newproposal'
import { FaPen } from 'react-icons/fa'
export default function NewProposal() {
  // TODO: Disable when fetching
  return (
    <Dialog>
      <DialogTrigger>
        <Box variant="create">
          <FaPen size="25px" />
        </Box>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <NewProposalModal proposalProp={'menu'} />
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
