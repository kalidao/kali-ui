import { styled } from '../../styles/stitches.config'
import { Dialog, DialogTrigger, DialogContent } from '../../styles/Dialog';
import NewTransactionModal from './NewTransactionModal';

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

export function NewTransactionSquare() {

  // TODO: Disable when fetching 
  return (
    <Dialog>
      <DialogTrigger>
        <CreateIcon>
            +
        </CreateIcon>
      </DialogTrigger>
      <DialogContent>
        <NewTransactionModal showMenu={true} />
      </DialogContent>
    </Dialog>
  )
}
