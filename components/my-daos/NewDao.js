import { styled } from '../../styles/stitches.config'
import { Name } from './DaoCard';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../styles/Dialog';
import DeployDAO from '../deploy-dao/DeployDAO';
import { Box } from '../../styles/elements';

const Card = styled('button', {
    background: '$foreground',
    color: '$background',
    fontSize: '32px',
    width: '250px',
    height: '300px',
    border: '1px solid $border',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // boxShadow: '3px 4px 5.5px #08FF08',

    '&:hover': {
      background: '$foreground',
      boxShadow: '3px 4px 5.5px #08FF08',
    },
    '&:active': {
      background: '$foreground',
      boxShadow: '3px 4px 5.5px #08FF08',
    }

});

export default function NewDao() {
  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          <Box 
            css={{ 
              fontWeight: '700',
              fontSize: '144.69px',
              lineHeight: '100%',
              color: '$background' 
            }}>
              +
            </Box>
          <Name>Create New</Name>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DeployDAO />
      </DialogContent>
    </Dialog>
  )
}
