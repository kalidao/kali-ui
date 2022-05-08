import { useState } from 'react'
import { styled } from "../../styles/stitches.config";
import { DialogTitle } from "../../styles/Dialog";
import Identity from "./Identity";
import Template from "./Template";
import Governance from "./Governance";
import Extensions from "./Extensions";
import Members from "./Members";
import Legal from "./Legal";
import Confirm from "./Confirm";
import {  Progress, ProgressIndicator } from "../../styles/Progress";
import { Navigation, PreviousButton, NextButton } from '../../styles/navigation';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { useAccount } from 'wagmi';

const Flex = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
});

createStore({
    redemption: {
        active: false
    },
    crowdsale: {
        active: false,
        purchaseLimit: 1000
    },
})

export default function DeployDAO() {
  const [step, setStep] = useState(0);

  const steps = [
    <Identity setStep={setStep} />,
    <Governance setStep={setStep} />,
    <Extensions setStep={setStep} />,
    <Members setStep={setStep} />,
    <Legal setStep={setStep} />,
    <Confirm setStep={setStep} />
  ] 
 
  return (
      <StateMachineProvider>
        <Flex>
            <DialogTitle>Create New DAO</DialogTitle>
            <Progress value={((step/(steps.length-1)) * 100)}>
                <ProgressIndicator style={{ transform: `translateX(-${100 - ((step/(steps.length-1)) * 100)}%)` }}/>
            </Progress>
            {steps[step]}
        </Flex>
      </StateMachineProvider>
  )
}
