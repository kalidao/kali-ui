import { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { useStateMachine } from 'little-state-machine'
import { HashZero, AddressZero } from '@ethersproject/constants'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'

import buildWrapprTokenUri from './buildWrapprTokenUri'
import { votingPeriodToSeconds, computeKaliAddress } from '../../../utils/'
import { validateFounders } from './validateFounders'

import { Warning } from '../../../styles/elements'
import { Stack, Button, Box } from '@kalidao/reality'
import { Error } from '../../../styles/form-elements'
import Confirmation from './Confirmation'
import Success from './Success'

import { addresses } from '../../../constants/addresses'
import { wrapprAddresses } from './wrapprAddresses'
import FACTORY_ABI from '../../../abi/KaliDAOfactory.json'
import WRAPPR_ABI from '../../../abi/Wrappr.json'

export default function Checkout({ setStep }) {
  const { state } = useStateMachine()
  const { hardMode } = state
  const { isConnected } = useAccount()
  const { chain: activeChain } = useNetwork()
  const [message, setMessage] = useState(null)

  const {
    data: deployKaliData,
    writeAsync: deployKali,
    isLoading: isWritePending,
    isSuccess: isWriteSuccess,
    isError: isDeployError,
    error: deployError,
  } = useContractWrite(
    {
      mode: 'recklesslyUnprepared',
      addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : AddressZero,
      contractInterface: FACTORY_ABI,
      functionName: 'deployKaliDAO',
    },
    {
      onSuccess(data) {
        console.log('success!', data)
      },
    },
  )

  // remove ricardian as default
  const deployKaliDao = useCallback(async () => {
    if (!isConnected || !activeChain) return

    const {
      name,
      symbol,
      transferability,
      votingPeriod,
      votingPeriodUnit,
      quorum,
      approval,
      founders,
      legal,
      docType,
      email,
    } = state

    const extensionsArray = new Array()
    const extensionsData = new Array()

    // Set up Wrappr via Extension
    if (legal) {
      const wrapprToken = await buildWrapprTokenUri(activeChain.id, docType, setMessage, state)
      const kaliAddress = computeKaliAddress(state.name, activeChain.id)

      const iface = new ethers.utils.Interface(WRAPPR_ABI)
      const payload = iface.encodeFunctionData('mint', [
        kaliAddress,
        wrapprToken.tokenId,
        1,
        HashZero,
        wrapprToken.tokenUri,
        kaliAddress,
      ])

      extensionsArray.push(wrapprAddresses[activeChain.id][docType])
      extensionsData.push(payload)

      setMessage('Wrapping DAO with populated legal template...')
    }

    const voteTime = votingPeriodToSeconds(votingPeriod, votingPeriodUnit)

    // get voters and shares array
    const { voters, shares } = validateFounders(founders)

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
    let govSettings
    if (approval > 51) {
      govSettings = new Array(voteTime, 0, quorum, approval, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3)
    } else {
      govSettings = new Array(voteTime, 0, quorum, 52, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
    }

    // tribute
    extensionsArray.push(addresses[activeChain?.id]['extensions']['tribute'])
    extensionsData.push('0x')

    console.log(
      'deploy params',
      name,
      symbol,
      'reserved',
      Number(!transferability),
      extensionsArray,
      extensionsData,
      voters,
      shares,
      govSettings,
    )
    try {
      setMessage('Getting ready to deploy...')
      const tx = await deployKali({
        recklesslySetUnpreparedArgs: [
          name,
          symbol,
          'reserved',
          Number(!transferability),
          extensionsArray,
          extensionsData,
          voters,
          shares,
          govSettings,
        ],
        recklesslySetUnpreparedOverrides: {
          gasLimit: 2100000,
        },
      }).catch((e) => {
        console.log('error', e.code, e.reason)
      })

      const _tx = await tx.wait()
      console.log(_tx)

      setMessage(`Deploying DAO on ${activeChain.name}...`)
    } catch (e) {
      console.log(e)
    }
  }, [isConnected, activeChain, state, deployKali])

  const prev = () => {
    if (!hardMode) {
      setStep(2)
    } else {
      setStep(3)
    }
  }

  return (
    <Stack>
      {deployKaliData ? <Success /> : <Confirmation />}
      <Button variant="transparent" onClick={prev}>
        Previous
      </Button>
      {/* {isDeployError && <Error message={deployError.message} />} */}
      <Box>{(message || isDeployError) && <Error message={isDeployError ? deployError.message : message} />}</Box>
      {!isConnected ? (
        <Warning warning="Your wallet is not connected. Please connect." />
      ) : (
        <Button variant="primary" width="full" onClick={deployKaliDao} disabled={isWritePending || isWriteSuccess}>
          {isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>}
        </Button>
      )}
    </Stack>
  )
}
