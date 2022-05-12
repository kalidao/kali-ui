import { styled } from '../../styles/stitches.config'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../styles/Dialog';
import DeployDaoWrapper from '../deploy-dao/';
import { Box } from '../../styles/elements';
import { NewProposalModal } from '../newproposal';

const CreateIcon = styled('div', {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',


    background: '$highlight2',
    width: '5rem',
    height: '5rem',
    fontWeight: '200',
    fontSize: '69px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  });

export function NewProposalSquare() {

  // TODO: Disable when fetching 
  return (
    <Dialog>
      <DialogTrigger>
        <CreateIcon>
            +
        </CreateIcon>
      </DialogTrigger>
      <DialogContent>
        <NewProposalModal />
      </DialogContent>
    </Dialog>
  )
}
