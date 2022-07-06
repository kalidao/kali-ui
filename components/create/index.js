import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '../../styles/Dialog'
import { Box, Button } from '../../styles/elements'
import ChooseDeployment from './ChooseDeployment'
import DeployDaoWrapper from '../deploy-dao'
import DeployClubWrapper from '../deploy-club'

export default function Create() {
  const [view, setView] = useState(0)

  const views = [
    <ChooseDeployment key="1" setView={setView} />,
    <DeployDaoWrapper key="2" setView={setView} />,
    <DeployClubWrapper key="3" setView={setView} />,
  ]

  console.log(view)
  return (
    <Dialog>
      <DialogTrigger>
        <Box variant="create">+</Box>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild />
        {views[view]}
      </DialogContent>
    </Dialog>
  )
}
