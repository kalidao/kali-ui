import { styled } from '../../../styles/stitches.config'
import { Name } from './DaoCard';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../../styles/Dialog';
import DeployDAO from '../../deploy-dao/DeployDAO';

const Card = styled('div', {
    background: '$white',
    width: '250px',
    height: '300px',
    borderRadius: '16px',
    border: '4px solid $border',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
});

const Plus = styled('div', {
    fontWeight: '700',
    fontSize: '144.69px',
    lineHeight: '100%',
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
