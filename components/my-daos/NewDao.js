import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../styles/Dialog';
import DeployDaoWrapper from '../deploy-dao/';
import { Box, Text } from '../../styles/elements';
import { styled } from '../../styles/stitches.config';

const Card = styled(Box, {
  width: '180px',
  height: '180px',
  background: '$background',
  color: '$foreground',
  border: '1px solid $gray800',
  boxShadow: 'rgba(92, 210, 45, 0.4) 5px 5px, rgba(92, 210, 45, 0.3) 10px 10px, rgba(92, 210, 45, 0.2)15px 15px, rgba(92, 210, 45, 0.1) 20px 20px, rgba(92, 210, 45, 0.05) 25px 25px',
  transition: 'linear 0.5s',

  '&:hover': {
    background: '$background',
    color: '$foreground',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  },
  '&:active': {
    background: '$background',
    color: '$foreground',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  }
})

const New = styled('div', {
  fontSize: '1rem',
  fontFamily: 'Screen'
})

export default function NewDao() {
  return (
    <Dialog>
      <DialogTrigger>
        <Card >
          <Text 
            css={{ 
              fontWeight: '700',
              fontSize: '144.69px',
              lineHeight: '100%',
              fontFamily: 'Screen',
             
            }}>
              +
            </Text>
          <New >Create New</New>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DeployDaoWrapper />
      </DialogContent>
    </Dialog>
  )
}
