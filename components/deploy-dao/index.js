import { useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { DialogTitle } from '../../styles/Dialog'
import { Progress, ProgressIndicator } from '../../styles/Progress'
import Identity from './Identity'
import Governance from './Governance'
import Redemption from './Redemption'
import Crowdsale from './Crowdsale'
import Members from './Members'
import Legal from './Legal'
import Checkout from './checkout'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { Text } from '../../styles/elements'
import Toggle from './Toggle'

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

createStore({
  hardMode: false,
  votingPeriod: '5',
  votingPeriodUnit: 'day',
  quorum: '20',
  approval: '60',
  transferability: false,
  redemption: false,
  redemptionStart: new Date(),
  crowdsale: false,
  purchaseToken: 'eth',
  purchaseLimit: 10000,
  personalLimit: 100,
  purchaseMultiplier: 10,
  crowdsaleEnd: new Date(),
  legal: false,
  docType: 'none',
})

// TODO:
// Allow interaction with outside from within the modal
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
      component: <Checkout setStep={setStep} />,
      title: 'Checkout',
    },
  }

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
