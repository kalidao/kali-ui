import { useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { DialogTitle } from '../../styles/Dialog'
import Identity from './Identity'
import Governance from './Governance'
import Redemption from './Redemption'
import Crowdsale from './Crowdsale'
import Members from './Members'
import Legal from './Legal'
import Confirm from './Confirm'
import { Progress, ProgressIndicator } from '../../styles/Progress'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { useAccount } from 'wagmi'
import { Button, Text } from '../../styles/elements'
import { DotFilledIcon, DotIcon } from '@radix-ui/react-icons'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import Toggle from './Toggle'

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

createStore({
  hardMode: false,
  votingPeriodUnit: 'day',
  transferability: false,
  redemption: false,
  crowdsale: false,
})

export default function DeployDaoWrapper() {
  const [step, setStep] = useState('id')
  // const [hardMode, setHardMode] = useState(false)
  const steps = {
    id: {
      component: <Identity setStep={setStep} />,
      title: 'ID',
    },
    gov: {
      component: <Governance setStep={setStep} />,
      title: 'Governance',
    },
    redemption: {
      component: <Redemption setStep={setStep} />,
      title: 'Redemption',
    },
    crowdsale: {
      component: <Crowdsale setStep={setStep} />,
      title: 'Crowdsale',
    },
    founders: {
      component: <Members setStep={setStep} />,
      title: 'Founders',
    },
    legal: {
      component: <Legal setStep={setStep} />,
      title: 'Legal',
    },
    confirm: {
      component: <Confirm setStep={setStep} />,
      title: 'Confirm',
    },
  }

  return (
    <StateMachineProvider>
      <Flex>
        <DialogTitle
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>{steps[step]['title']}</Text>
          <Toggle />
        </DialogTitle>
        <Progress value={(step / (steps.length - 1)) * 100}>
          <ProgressIndicator style={{ transform: `translateX(-${100 - (step / (steps.length - 1)) * 100}%)` }} />
        </Progress>
        {steps[step]['component']}
      </Flex>
    </StateMachineProvider>
  )
}
