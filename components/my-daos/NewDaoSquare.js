import { styled } from '../../styles/stitches.config'
import { Name } from './DaoCard';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../styles/Dialog';
import DeployDAO from '../deploy-dao/DeployDAO';
import { Box } from '../../styles/elements';

const CreateIcon = styled('div', {
    background: '$highlight2',
    width: '5rem',
    height: '5rem',
    fontWeight: '200',
    fontSize: '69px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  });

export default function NewDao() {
  return (
    <Dialog>
      <DialogTrigger>
        <CreateIcon>
            +
        </CreateIcon>
      </DialogTrigger>
      <DialogContent>
        <DeployDAO />
      </DialogContent>
    </Dialog>
  )
}
