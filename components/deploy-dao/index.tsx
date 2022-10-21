import { useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { Text, Box, Heading } from '@kalidao/reality'
import { Progress, ProgressIndicator } from '../../styles/Progress'
import Identity from './Identity'
import Governance from './Governance'
import Redemption from './Redemption'
import Crowdsale from './Crowdsale'
import Members from './Members'
import Legal from './Legal'
import Checkout from './checkout'
import { StateMachineProvider, createStore } from 'little-state-machine'
import Toggle from './Toggle'
import { pulse, contentShow } from '@design/animation'

const Flex = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  background: '$mauve1',
  color: '$mauve12',
  borderRadius: '20px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '90vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards, ${pulse} 10s linear 0ms infinite alternate`,
  },
})

createStore({
  name: '',
  symbol: '',
  hardMode: false,
  votingPeriod: 5,
  votingPeriodUnit: 'day',
  quorum: 20,
  approval: 60,
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
  founders: [
    {
      member: '',
      share: '',
    },
  ],
})

// TODO:
// Allow interaction with outside from within the modal
export default function DeployDaoWrapper() {
  const [step, setStep] = useState(0)
  // const [hardMode, setHardMode] = useState(false)
  const steps = [
    {
      component: <Identity setStep={setStep} />,
      title: 'Summon',
      description: `You are about to summon a KaliDAO, an on-chain organization 
      with a native token, voting mechanism, and legal structure. To get 
      started, pick a name and symbol for your DAO and Token`,
    },
    {
      component: <Governance setStep={setStep} />,
      title: 'Voting',
      description: `Update voting parameters according to your workflow. if 
      decision-making is generally consistent and frequent, we recommend shorter 
      voting period and lower participation.`,
    },
    // {
    //   component: <Redemption setStep={setStep} />,
    //   title: 'Extension: Redemption',
    //   description: `This extension gives everyone the ability
    //   to redeem KaliDAO treasury by burning her KaliDAO tokens.`,
    // },
    // {
    //   component: <Crowdsale setStep={setStep} />,
    //   title: 'Extension: Swap',
    //   description: `This extension gives KaliDAO the ability to swap KaliDAO tokens 
    //   for Eth or ERC20s.`,
    // },
    {
      component: <Members setStep={setStep} />,
      title: 'Founding Members',
      description: `If a new founding member is added, we must specify a KaliDAO token
      amount.`,
    },
    {
      component: <Legal setStep={setStep} />,
      title: 'Type of entity',
      description: `Pick an entity for this KaliDAO. Read and understand entity formation 
      documents before making a selection. Review resources below to better identify the 
      entity structure this KaliDAO needs.
      `,
    },
    {
      component: <Checkout setStep={setStep} />,
      title: 'Checkout',
      description: `Updates to the DAO require proposals, i.e., 
      minting tokens, amending quorum etc.`,
    },
  ]

  return (
    <StateMachineProvider>
      <Flex>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Heading>{steps[step]['title']}</Heading>
          <Toggle />
        </Box>
        <Text>{steps[step]['description']}</Text>
        <Progress value={(step / (steps.length - 1)) * 100}>
          <ProgressIndicator style={{ transform: `translateX(-${100 - (step / (steps.length - 1)) * 100}%)` }} />
        </Progress>
        {steps[step]['component']}
      </Flex>
    </StateMachineProvider>
  )
}
