import { useStateMachine } from 'little-state-machine';
import { Button, Flex } from '../../styles/elements';
import { useAccount, useContractWrite, useNetwork } from 'wagmi';
import { useCallback } from 'react';
import FACTORY_ABI from '../../abi/KaliClubSigFactory.json'
import { formatBytes32String, parseEther, formatUnits, formatEther } from 'ethers/lib/utils';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import { ethers } from 'ethers';

export default function Confirm({ setStep }) {
  const { state } = useStateMachine();
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const { writeAsync, isLoading: isWritePending, isError } = useContractWrite(
    {
      addressOrName: '0x8Ba8438024fCaFa94C37c6C69D01DDb2Db06ba3A',
      contractInterface: FACTORY_ABI, 
    },
    'deployClubSig',
    {
      onSuccess() {
        console.log('success!')
      }
    }
  )

  const deployClub = useCallback(async () => {
    if (!account) return 
    const {
      name,
      symbol,
      quorum,
      founders,
      docType,
      email,
      lootPaused,
      signerPaused
    } = state;

    name = formatBytes32String(name);
    symbol = formatBytes32String(symbol);
    
    console.log(founders[0]["signer"] > founders[1]["signer"])

    // club tuple
    let club = []
    let members = new Array()
    for (let i=0; i<founders.length; i++) {

    }
    for (let i=0; i<founders.length; i++) {
      // const loot = BigNumber.from(founders[i]["loot"])
      club.push([founders[i]["signer"], i, parseEther(founders[i]["loot"])])
    }
    // sorting for smart contract
    club = club.sort((a, b) => a[0] - b[0])

    const calls = new Array()
    const baseURI = ''
    const docs = ''
    const redemptionStart = 0;

    console.log('deploy', calls, club, quorum, redemptionStart, name, symbol, lootPaused, signerPaused, baseURI, docs) 
    const provider = new ethers.providers.InfuraProvider(4, process.env.NEXT_PUBLIC_INFURA_ID)
    const code = await provider.getCode('0x8Ba8438024fCaFa94C37c6C69D01DDb2Db06ba3A');
    console.log('code', code)

    const data = await writeAsync({ args: [
      calls,
      club,
      quorum,
      redemptionStart,
      name,
      symbol,
      lootPaused,
      signerPaused,
      baseURI,
      docs
    ], overrides: {
      from: account?.address,
      gasLimit: 700000
    }})

    if (data.wait()) return

  }, [account, state, writeAsync]);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(isError, null, 2)}</pre>
      <Flex>
        <Button variant="transparent" onClick={() => setStep((prev) => --prev)}>Previous</Button>
      </Flex>
      <Button variant="primary" css={{ width: '100%'}} onClick={deployClub} disabled={isWritePending}>{isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>}</Button>
    </div>
  )
}
