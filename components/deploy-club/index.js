import { useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { DialogTitle } from '../../styles/Dialog'
import { Progress, ProgressIndicator } from '../../styles/Progress'
import Identity from './Identity'
import Signers from './Signers'
import Checkout from './checkout'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { Text } from '../../styles/elements'

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

createStore({
  name: '',
  quorum: 1,
})

// TODO:
// Allow interaction with outside from within the modal
export default function DeployClubWrapper({ setView }) {
  const [step, setStep] = useState(0)
  // const [hardMode, setHardMode] = useState(false)
  const steps = [
    {
      component: <Identity setStep={setStep} setView={setView} />,
      title: 'ID',
    },
    {
      component: <Signers setStep={setStep} />,
      title: 'Signers',
    },
    {
      component: <Checkout setStep={setStep} />,
      title: 'Checkout',
    },
  ]

  return (
    <StateMachineProvider>
      <Flex>
        <DialogTitle
          css={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Text>{steps[step]['title']}</Text>
        </DialogTitle>
        <Progress value={(step / (steps.length - 1)) * 100}>
          <ProgressIndicator style={{ transform: `translateX(-${100 - (step / (steps.length - 1)) * 100}%)` }} />
        </Progress>
        {steps[step]['component']}
      </Flex>
    </StateMachineProvider>
  )
}
