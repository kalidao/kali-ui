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

const Flex = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
});

const SubmitButton = styled('button', {
    background: '$purple',
    color: '$white',
    borderRadius: '22.81px',
    padding: '0.2rem 0.5rem'
});

export default function DeployDAO() {
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({
    network: 1,
    identity: {
        daoName: null,
        symbol: null,
    },
    daoType: null,
    founders: {
        members: null,
        shares: null,
    },
    governance: {
        votingPeriod: 1,
        votingPeriodUnit: 0,
        paused: 1,
        quorum: 10,
        supermajority: 60,
    },
    extensions: {
        tribute: {
            active: false,
        },
        redemption: {
            active: false,
            redemptionStart: 0,
        },
        crowdsale: {
            active: false,
            purchaseToken: null,
            purchaseMultiplier: 10,
            purchaseLimit: 1000,
            terms: null,
            saleEnds: 0,
            listId: 0,
            list: null,
            documentation: "",
            },
    },
    daoType: null,
    legal: {
        docs: "none",
        docType: 999,
    },
    email: null,
    misc: {
        mission: null,
        city: null,
        project: null,
    },
    });

  const steps = [
    <Identity details={details} setDetails={setDetails} />,
    <Governance details={details} setDetails={setDetails} />,
    <Extensions details={details} setDetails={setDetails} />,
    <Members details={details} setDetails={setDetails} />,
    <Legal details={details} setDetails={setDetails} />,
    <Confirm details={details} setDetails={setDetails} />
  ] 
 
  return (
    <Flex>
        <DialogTitle>Create New DAO</DialogTitle>
        <Progress value={((step/(steps.length-1)) * 100)}>
            <ProgressIndicator style={{ transform: `translateX(-${100 - ((step/(steps.length-1)) * 100)}%)` }}/>
        </Progress>
        <Template details={details} setDetails={setDetails} />
        {steps[step]}
        <Navigation>
            {step === 0 ? null : <PreviousButton onClick={() => setStep((prev) => --prev)}>Previous</PreviousButton>}
            {step === steps.length-1 ? null : <NextButton onClick={() => setStep((prev) => ++prev)}>Next</NextButton>}
        </Navigation>
        {step === steps.length-1 && <SubmitButton>Submit</SubmitButton>}
    </Flex>
  )
}
