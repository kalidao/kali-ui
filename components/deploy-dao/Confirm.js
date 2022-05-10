import { useStateMachine } from 'little-state-machine';
import updateAction from "./updateAction";
import { ethers } from 'ethers';
import { Button, Flex } from '../../styles/elements';

export default function Confirm({ setStep }) {
  const { state } = useStateMachine(updateAction);

  const deploy = () => {
    console.log(state);  
  };

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Flex>
        <Button variant="transparent" onClick={() => setStep((prev) => --prev)}>Previous</Button>
      </Flex>
      <Button variant="accent" css={{ width: '100%'}} onClick={deploy}>Submit</Button>
    </div>
  )
}
