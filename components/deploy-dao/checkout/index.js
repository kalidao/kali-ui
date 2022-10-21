import { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { useStateMachine } from 'little-state-machine'
import { HashZero, AddressZero } from '@ethersproject/constants'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'

import validateDocs from './validateDocs'
import buildWrapprTokenUri from './buildDocUri'
import { votingPeriodToSeconds, fetchTokens } from '../../../utils/'
import { validateFounders } from './validateFounders'

import { Warning } from '../../../styles/elements'
import { Stack, Button } from '@kalidao/reality'
import { Error } from '../../../styles/form-elements'
import Confirmation from './Confirmation'
import Success from './Success'

import { addresses } from '../../../constants/addresses'
import { wrapprAddresses } from './wrapprAddresses'
import FACTORY_ABI from '../../../abi/KaliDAOfactory.json'
import REDEMPTION_ABI from '../../../abi/KaliDAOredemption.json'
import SALE_ABI from '../../../abi/KaliDAOcrowdsale.json'
import WRAPPR_ABI from '../../../abi/Wrappr.json'
import { useRouter } from 'next/router'

export default function Checkout({ setStep }) {
  const router = useRouter()
  const { state } = useStateMachine()
  const { hardMode } = state
  const { address: account, isConnected } = useAccount()
  const { chain: activeChain } = useNetwork()
  const [error, setError] = useState(null)

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

    // Set up Wrappr
    if (legal) {
      const { wrapprTokenId, wrapprTokenUri } = buildWrapprTokenUri(activeChain.id, docType, setError, state)
      console.log(wrapprTokenId, wrapprTokenUri)

      const iface = new ethers.utils.Interface(WRAPPR_ABI)
      const encodedParams = ethers.utils.defaultAbiCoder.encode(
        ['address', 'uint256', 'uint256', 'bytes', 'string', 'address'],
        [account, wrapprTokenId, 1, HashZero, wrapprTokenUri, account],
      )
      const payload = iface.encodeFunctionData('mint', [encodedParams])

      extensionsArray.push(wrapprAddresses[activeChain.id][docType])
      extensionsData.push(payload)
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

    // redemption
    // if (state.redemption === true) {
    //   let { redemptionStart } = state
    //   redemptionStart = parseInt(new Date(redemptionStart).getTime() / 1000)
    //   console.log('redemptionStarts', new Date(redemptionStart))
    //   const tokenArray = fetchTokens(activeChain?.id)

    //   const iface = new ethers.utils.Interface(REDEMPTION_ABI)
    //   const encodedParams = ethers.utils.defaultAbiCoder.encode(['address[]', 'uint256'], [tokenArray, redemptionStart])
    //   const payload = iface.encodeFunctionData('setExtension', [encodedParams])

    //   extensionsArray.push(addresses[activeChain?.id]['extensions']['redemption'])
    //   extensionsData.push(payload)
    // }

    // crowdsale
    // if (state.crowdsale === true) {
    //   const { purchaseMultiplier, purchaseLimit, purchaseToken, personalLimit, crowdsaleEnd } = state
    //   if (purchaseToken === 'eth') {
    //     purchaseToken = '0x000000000000000000000000000000000000dead'
    //   }
    //   if (purchaseToken === 'custom') {
    //     purchaseToken = state.customTokenAddress
    //   }

    //   crowdsaleEnd = parseInt(new Date(crowdsaleEnd).getTime() / 1000)

    //   const iface = new ethers.utils.Interface(SALE_ABI)
    //   const encodedData = new ethers.utils.AbiCoder().encode(
    //     ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
    //     [
    //       0,
    //       purchaseMultiplier,
    //       purchaseToken,
    //       crowdsaleEnd,
    //       ethers.utils.parseEther(purchaseLimit),
    //       ethers.utils.parseEther(personalLimit),
    //       'documentation',
    //     ],
    //   )
    //   const payload = iface.encodeFunctionData('setExtension', [encodedData])

    //   extensionsArray.push(addresses[activeChain?.id]['extensions']['crowdsale2'])
    //   extensionsData.push(payload)
    // }

    console.log('docs - ', legal, docType, wrapprTokenUri)
    // console.log(
    //   'deploy params',
    //   name,
    //   symbol,
    //   docs_,
    //   Number(!transferability),
    //   extensionsArray,
    //   extensionsData,
    //   voters,
    //   shares,
    //   govSettings,
    // )
    // const tx = await writeAsync({
    //   recklesslySetUnpreparedArgs: [
    //     name,
    //     symbol,
    //     docs_,
    //     Number(!transferability),
    //     extensionsArray,
    //     extensionsData,
    //     voters,
    //     shares,
    //     govSettings,
    //   ],
    //   recklesslySetUnpreparedOverrides: {
    //     gasLimit: 1600000,
    //   },
    // }).catch((e) => {
    //   console.log('error', e.code, e.reason)
    // })
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
      {isDeployError && <Error message={deployError.message} />}
      {error && <Error message={error} />}
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
