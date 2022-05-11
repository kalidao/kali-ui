import { useState } from 'react'
import { styled } from "../../styles/stitches.config";
import { DialogTitle } from "../../styles/Dialog";
import Identity from "./Identity";
import Governance from "./Governance";
import Extensions from "./Extensions";
import Members from "./Members";
import Legal from "./Legal";
import Confirm from "./Confirm";
import {  Progress, ProgressIndicator } from "../../styles/Progress";
import { StateMachineProvider, createStore } from 'little-state-machine';
import { useAccount } from 'wagmi';

const Flex = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
});

createStore({})

export default function DeployDAO() {
  const [step, setStep] = useState(0);

  const steps = [
      {
      component: <Identity setStep={setStep} />,
      title: 'Identity'
      },
      {
        component: <Governance setStep={setStep} />,
        title: 'Governance'
      },
      {
        component: <Extensions setStep={setStep} />,
        title: 'Extensions'
      },
      {
        component: <Members setStep={setStep}  />,
        title: 'Founders'
      },
      {
        component: <Legal setStep={setStep} />,
        title: 'Legal'
      },
      {
        component: <Confirm setStep={setStep} />,
        title: 'Confirm'
      },
  ] 
 
  return (
      <StateMachineProvider>
        <Flex>
            <DialogTitle>{steps[step]["title"]}</DialogTitle>
            <Progress value={((step/(steps.length-1)) * 100)}>
                <ProgressIndicator style={{ transform: `translateX(-${100 - ((step/(steps.length-1)) * 100)}%)` }}/>
            </Progress>
            {steps[step]["component"]}
        </Flex>
      </StateMachineProvider>
  )
}
