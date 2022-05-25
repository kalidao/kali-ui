import { Dialog, DialogTrigger, DialogContent } from '../../../styles/Dialog';
import { Box } from '../../../styles/elements';
import { NewProposalModal } from '../newproposal';

export default function NewProposal() {
  // TODO: Disable when fetching 
  return (
    <Dialog>
      <DialogTrigger>
        <Box variant="create">+</Box>
      </DialogTrigger>
      <DialogContent>
        <NewProposalModal proposalProp={"menu"} />
      </DialogContent>
    </Dialog>
  )
}
