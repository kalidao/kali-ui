import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../styles/Dialog';
import DeployDAO from '../deploy-dao/DeployDAO';
import { Box, Text } from '../../styles/elements';
import { styled } from '../../styles/stitches.config';

const Card = styled(Box, {
  width: '180px',
  height: '180px',
  background: '$foreground',
  color: '$background',
  boxShadow: '3px 4px 5.5px #08FF08',

  '&:hover': {
    background: '$background',
    color: '$foreground',
    boxShadow: '3px 4px 5.5px #fff',
  },
  '&:active': {
    background: '$background',
    color: '$foreground',
    boxShadow: '3px 4px 5.5px #fff',
  }
})

const New = styled('div', {
  fontSize: '1rem',
  fontFamily: 'screen'
})

export default function NewDao() {
  return (
    <Dialog>
      <DialogTrigger>
        <Card >
          <Box 
            css={{ 
              fontWeight: '700',
              fontSize: '144.69px',
              lineHeight: '100%',
            }}>
              +
            </Box>
          <New >Create New</New>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DeployDAO />
      </DialogContent>
    </Dialog>
  )
}
