import { useState } from 'react'
import { StateMachineProvider, createStore } from 'little-state-machine'
import { Progress } from '@components/ui/progress'
import Identity from './Identity'
import Governance from './Governance'
import Redemption from './Redemption'
import Crowdsale from './Crowdsale'
import Members from './Members'
import Legal from './Legal'
import Checkout from './checkout'
import Toggle from './Toggle'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'

createStore({
  name: '',
  symbol: '',
  hardMode: false,
  votingPeriod: 1,
  votingPeriodUnit: 'day',
  quorum: 20,
  approval: 60,
  transferability: false,
  redemption: false,
  redemptionStart: new Date().toDateString(),
  crowdsale: false,
  purchaseToken: 'eth',
  customTokenAddress: '',
  purchaseLimit: 10000,
  personalLimit: 100,
  purchaseMultiplier: 10,
  crowdsaleEnd: new Date().toDateString(),
  legal: false,
  docType: 'none',
  email: '',
  mission: '',
  existingDocs: '',
  founders: [
    {
      member: '',
      share: '',
    },
  ],
})

export default function DeployDaoWrapper() {
  const [step, setStep] = useState(0)
  const steps = [
    {
      component: <Identity setStep={setStep} />,
      title: 'Summon',
      description: `You are about to summon a KaliDAO, an on-chain organization
      with a native token and voting mechanism. To get
      started, pick a name and symbol for your DAO and Token.`,
    },
    {
      component: <Governance setStep={setStep} />,
      title: 'Voting',
      description: `Update voting parameters according to your workflow. If
      decision-making is generally consistent and frequent, we recommend shorter
      voting period and lower participation requirements.`,
    },
    {
      component: <Redemption setStep={setStep} />,
      title: 'Extension: Redemption',
      description: `This extension gives everyone the ability
      to redeem KaliDAO treasury by burning her KaliDAO tokens.`,
    },
    {
      component: <Crowdsale setStep={setStep} />,
      title: 'Extension: Swap',
      description: `This extension gives KaliDAO the ability to swap KaliDAO tokens
      for Eth or ERC20s.`,
    },
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
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex flex-row w-full items-center justify-between">
            <CardTitle>
              <h2 className="text-2xl font-bold">{steps[step].title}</h2>
            </CardTitle>
            <Toggle />
          </div>
          <CardDescription>{steps[step].description}</CardDescription>
          <Progress value={(step / (steps.length - 1)) * 100} className="mb-6" />
        </CardHeader>
        <CardContent>{steps[step].component}</CardContent>
      </Card>
    </StateMachineProvider>
  )
}
