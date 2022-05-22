import { Dialog, DialogTrigger, DialogContent } from '../../styles/Dialog';
import { Box } from '../../styles/elements';
import { NewProposalModal } from '../newproposal';


export function NewProposalSquare() {
  // TODO: Disable when fetching 
  return (
    <Dialog>
      <DialogTrigger>
        <Box variant="create">+</Box>
      </DialogTrigger>
      <DialogContent>
        <NewProposalModal showMenu={true} />
      </DialogContent>
    </Dialog>
  )
}
