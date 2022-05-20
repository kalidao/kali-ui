import React from 'react'
import { Box } from '../../styles/elements';
import { Dialog, DialogContent, DialogTrigger } from '../../styles/Dialog'
import { New, Card } from './NewDao';
import DeployClub from '../deploy-club';

export default function NewClub() {
  return (
    <Dialog>
        <DialogTrigger>
            <Card>
                <Box 
                css={{ 
                fontWeight: '700',
                fontSize: '144.69px',
                lineHeight: '100%',
                }}>
                +
                </Box>
                <New>Create New</New>
            </Card>
        </DialogTrigger>
        <DialogContent>
            <DeployClub />
        </DialogContent>
    </Dialog>
  )
}
