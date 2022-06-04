import { useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { DialogTitle } from '../../styles/Dialog'
import Identity from './Identity'
import Governance from './Governance'
import Extensions from './Extensions'
import Members from './Members'
import Legal from './Legal'
import Confirm from './Confirm'
import { Progress, ProgressIndicator } from '../../styles/Progress'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { useAccount } from 'wagmi'
import { Button, Text } from '../../styles/elements'
import { DotFilledIcon, DotIcon } from '@radix-ui/react-icons'

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
})

createStore({
  votingPeriodUnit: 'day',
  transferability: false
})

export default function DeployDaoWrapper() {
  const [step, setStep] = useState('id')
  const [hardMode, setHardMode] = useState(false)

  const steps = {
    id: {
      component: <Identity setStep={setStep} hardMode={hardMode} />,
      title: 'ID',
    },
    gov: {
      component: <Governance setStep={setStep} hardMode={hardMode} />,
      title: 'Governance',
    },
    apps: {
      component: <Extensions setStep={setStep} hardMode={hardMode} />,
      title: 'Extensions',
    },
    founders: {
      component: <Members setStep={setStep} hardMode={hardMode} />,
      title: 'Founders',
    },
    legal: {
      component: <Legal setStep={setStep} hardMode={hardMode} />,
      title: 'Legal',
    },
    confirm: {
      component: <Confirm setStep={setStep} hardMode={hardMode} />,
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
          <Button
            variant="transparent"
            css={{
              display: 'flex',
              background: '$gray100',
              color: '$background',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '600',
              '&:hover': {
                background: '$gray100',
              },
            }}
            onClick={() => setHardMode((hardMode) => !hardMode)}
          >
            {hardMode === false ? 'Easy Mode' : 'Hard Mode'}
            <DotFilledIcon color={hardMode === false ? 'green' : 'red'} />
          </Button>
        </DialogTitle>

        <Progress value={(step / (steps.length - 1)) * 100}>
          <ProgressIndicator style={{ transform: `translateX(-${100 - (step / (steps.length - 1)) * 100}%)` }} />
        </Progress>
        {steps[step]['component']}
      </Flex>
    </StateMachineProvider>
  )
}
