import { styled } from '../../styles/stitches.config'
import { Name } from './DaoCard';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../styles/Dialog';
import DeployDAO from '../deploy-dao/DeployDAO';

const Card = styled('button', {
    background: '$accent',
    color: '$foreground',
    fontSize: '32px',
    width: '250px',
    height: '300px',
    border: '1px solid $border',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '3px 4px 5.5px #d2a8ff'
});

const Plus = styled('div', {
    fontWeight: '700',
    fontSize: '144.69px',
    lineHeight: '100%',
    color: '$foreground'
});

export default function NewDao() {

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <Plus>+</Plus>
          <Name>Create New</Name>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DeployDAO />
      </DialogContent>
    </Dialog>
  )
}
