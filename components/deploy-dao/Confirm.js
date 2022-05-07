import React from 'react'
import { styled } from '../../styles/stitches.config';
import { Title } from "../../styles/form";
import { useStateMachine } from 'little-state-machine';
import updateAction from "./updateAction";
import { Navigation, PreviousButton } from '../../styles/navigation';
import { ethers } from 'ethers';

const SubmitButton = styled('button', {
  background: '$purple',
  color: '$white',
  borderRadius: '22.81px',
  padding: '0.2rem 0.5rem',
  width: '100%'
});

export default function Confirm({ setStep }) {
  const { state } = useStateMachine(updateAction);

  const deploy = () => {
    console.log(state);  
  };

  return (
    <div>
      <Title>Confirm</Title>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Navigation>
        <PreviousButton onClick={() => setStep((prev) => --prev)}>Previous</PreviousButton>
      </Navigation>
      <SubmitButton onClick={deploy }>Submit</SubmitButton>
    </div>
  )
}
