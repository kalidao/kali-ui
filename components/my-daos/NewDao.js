import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../styles/Dialog';
import DeployDaoWrapper from '../deploy-dao/';
import { Box, Text } from '../../styles/elements';
import { styled } from '../../styles/stitches.config';

const Card = styled(Box, {
  width: '180px',
  height: '180px',
  background: '$foreground',
  color: '$background',
  boxShadow: 'inset .313em .313em 0 #08FF08, inset -.313em -.313em 0 rgba(255,255,255,0.4), 0 1em 0.625em -.4em #08FF08',
  boxShadow: '3px 4px 5.5px #08FF08',
  transition: 'linear .1s',

  '&:hover': {
    background: '$background',
    color: '$foreground',
    boxShadow: 'inset .313em .313em 0 rgba(0,0,0,0.8), inset -.313em -.313em 0 rgba(255,255,255,0.6), 0 1em 0.625em -.4em rgba(255,255,255,0.8)',
  },
  '&:active': {
    background: '$background',
    color: '$foreground',
    boxShadow: 'inset .313em .313em 0 rgba(0,0,0,0.8), inset -.313em -.313em 0 rgba(255,255,255,0.6), 0 1em 0.625em -.4em rgba(255,255,255,0.8)',
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
        <DeployDaoWrapper />
      </DialogContent>
    </Dialog>
  )
}
