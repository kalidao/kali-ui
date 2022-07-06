import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '../../styles/Dialog'
import { Box, Button } from '../../styles/elements'
import ChooseDeployment from './ChooseDeployment'
import DeployDaoWrapper from '../deploy-dao'
import DeployClubWrapper from '../deploy-club'

export default function Create() {
  const [view, setView] = useState(0)

  const views = [
    <ChooseDeployment setView={setView} />,
    <DeployDaoWrapper setView={setView} />,
    <DeployClubWrapper setView={setView} />,
  ]

  console.log(view)
  return (
    <Dialog>
      <DialogTrigger>
        <Box variant="create">+</Box>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild />
        {/* <Button onClick={() => setView(1)}>DAO</Button>
        <Button onClick={() => setView(2)}>Club</Button> */}
        {views[view]}
      </DialogContent>
    </Dialog>
  )
}
