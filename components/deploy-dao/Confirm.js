import { useStateMachine } from 'little-state-machine';
import updateAction from "./updateAction";
import { ethers, AddressZero } from 'ethers';
import { Button, Flex } from '../../styles/elements';
import { useAccount, useContractWrite, useNetwork } from 'wagmi';
import { useCallback } from 'react';
import { addresses } from "../../constants/addresses";
import FACTORY_ABI from '../../abi/KaliDAOfactory.json'

export default function Confirm({ setStep }) {
  const { state } = useStateMachine();
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const { writeAsync, isLoading: isWritePending, isError } = useContractWrite(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]["factory"] : AddressZero,
      contractInterface: FACTORY_ABI, 
    },
    'deployKaliDAO',
    {
      onSuccess() {
        console.log('success!')
      }
    }
  )

  const deployKaliDao = useCallback(async () => {
    if (!account) return 
    const {
      name,
      symbol,
      paused,
      votingPeriod,
      votingPeriodUnit,
      quorum,
      approval,
      founders,
      legal,
      docs,
      email
    } = state;

    let voteTime
    if (votingPeriodUnit === "minutes") {
      voteTime = votingPeriod * 60 * 60
    }
    if (votingPeriodUnit === "hours") {
      voteTime = votingPeriod * 60 * 60 * 60
    }
    if (votingPeriodUnit === "days") {
      voteTime = votingPeriod * 60 * 60 * 24
    }

    console.log(founders)
    let voters = []
    let shares = []
    for (let i=0; i<founders.length; i++) {
      voters.push(founders[i]["member"])
      shares.push(founders[i]["share"])
    }
    
    /* govSettings
    0 : votingPeriod
    1: gracePeriod
    2: quorum
    3: supermajority
    4: proposalVoteTypes[ProposalType.MINT]
    5: proposalVoteTypes[ProposalType.BURN]
    6: proposalVoteTypes[ProposalType.CALL]
    7: proposalVoteTypes[ProposalType.VPERIOD]
    8: proposalVoteTypes[ProposalType.GPERIOD]
    9: proposalVoteTypes[ProposalType.QUORUM]
    10: proposalVoteTypes[ProposalType.SUPERMAJORITY]
    11: proposalVoteTypes[ProposalType.TYPE]
    12: proposalVoteTypes[ProposalType.PAUSE]
    13: proposalVoteTypes[ProposalType.EXTENSION]
    14: proposalVoteTypes[ProposalType.ESCAPE]
    15: proposalVoteTypes[ProposalType.DOCS]
    */

    const govSettings = Array(
      voteTime,
      0,
      quorum,
      approval,
    );

    if (approval > 50) {
      govSettings = govSettings.concat([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
    } else {
      govSettings = govSettings.concat([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    }

   const extensionArray = new Array()
   const extensionData = new Array()
   console.log(govSettings)
    const data = await writeAsync({ args: [
      name,
      symbol,
      '',
      Number(paused),
      extensionArray,
      extensionData,
      voters,
      shares,
      govSettings
    ] })

    if (data.wait()) return

  }, [account, state, writeAsync]);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(isError, null, 2)}</pre>
      <Flex>
        <Button variant="transparent" onClick={() => setStep((prev) => --prev)}>Previous</Button>
      </Flex>
      <Button variant="primary" css={{ width: '100%'}} onClick={deployKaliDao} disabled={isWritePending}>{isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>}</Button>
    </div>
  )
}
