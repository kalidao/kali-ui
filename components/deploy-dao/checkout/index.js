import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useStateMachine } from 'little-state-machine'
import { AddressZero } from '@ethersproject/constants'
import { useAccount, useContractEvent, useContractWrite, useNetwork } from 'wagmi'

import validateDocs from './validateDocs'
import { votingPeriodToSeconds, fetchTokens } from '../../../utils/'
import { validateFounders } from './validateFounders'

import { Button, Flex, Text, Warning } from '../../../styles/elements'
import { Error } from '../../../styles/form-elements'
import Confirmation from './Confirmation'
import Success from './Success'

import { addresses } from '../../../constants/addresses'
import FACTORY_ABI from '../../../abi/KaliDAOfactory.json'
import REDEMPTION_ABI from '../../../abi/KaliDAOredemption.json'
import SALE_ABI from '../../../abi/KaliDAOcrowdsale.json'
import { useRouter } from 'next/router'

export default function Checkout({ setStep }) {
  const router = useRouter()
  const { state } = useStateMachine()
  const { hardMode } = state
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const {
    data,
    writeAsync,
    isLoading: isWritePending,
    isSuccess: isWriteSuccess,
    isError,
    error,
  } = useContractWrite(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'deployKaliDAO',
    {
      onSuccess(data) {
        console.log('success!', data)
      },
    },
  )
  useContractEvent(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'DAOdeployed',
    (event) => router.push(`/daos/${activeChain?.id}/${event[0]}`),
    {
      chainId: activeChain?.id,
    },
  )

  // remove ricardian as default
  const deployKaliDao = useCallback(async () => {
    if (!account || !activeChain) return

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

    const docs_ = validateDocs(
      docType,
      state.existingDocs ? state.existingDocs : null,
      name,
      state.mission ? state.mission : null,
    )
    console.log('docs', docs_)

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

    const extensionsArray = new Array()
    const extensionsData = new Array()

    // tribute
    extensionsArray.push(addresses[activeChain?.id]['extensions']['tribute'])
    extensionsData.push('0x')

    // redemption
    if (state.redemption === true) {
      let { redemptionStart } = state
      redemptionStart = parseInt(new Date(redemptionStart).getTime() / 1000)
      const tokenArray = fetchTokens(activeChain?.id)

      const iface = new ethers.utils.Interface(REDEMPTION_ABI)
      const encodedParams = ethers.utils.defaultAbiCoder.encode(['address[]', 'uint256'], [tokenArray, redemptionStart])
      const payload = iface.encodeFunctionData('setExtension', [encodedParams])

      extensionsArray.push(addresses[activeChain?.id]['extensions']['redemption'])
      extensionsData.push(payload)
    }
    // crowdsale
    if (state.crowdsale === true) {
      const { purchaseMultiplier, purchaseLimit, purchaseToken, personalLimit, crowdsaleEnd } = state
      if (purchaseToken === 'eth') {
        purchaseToken = '0x000000000000000000000000000000000000dead'
      }
      crowdsaleEnd = parseInt(new Date(crowdsaleEnd).getTime() / 1000)

      const saleFace = new ethers.utils.Interface(SALE_ABI)
      const encodedData = new ethers.utils.AbiCoder().encode(
        ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [0, purchaseMultiplier, purchaseToken, crowdsaleEnd, purchaseLimit, personalLimit, 'documentation'],
      )
      const payload = saleFace.encodeFunctionData('setExtension', [encodedData])

      extensionsArray.push(addresses[activeChain?.id]['extensions']['crowdsale2'])
      extensionsData.push(payload)
    }

    console.log(
      'deploy params',
      name,
      symbol,
      docs_,
      Number(!transferability),
      extensionsArray,
      extensionsData,
      voters,
      shares,
      govSettings,
    )
    const data = await writeAsync({
      args: [
        name,
        symbol,
        docs_,
        Number(!transferability),
        extensionsArray,
        extensionsData,
        voters,
        shares,
        govSettings,
      ],
      overrides: {
        gasLimit: 1050000,
      },
    }).catch((e) => {
      console.log('error', e.code, e.reason)
    })
    console.log('async data', data)
  }, [account, state, writeAsync])

  const prev = () => {
    if (!hardMode) {
      setStep('founders')
    } else {
      setStep('legal')
    }
  }

  return (
    <Flex dir="col">
      {isError && <Error message={error.message} />}
      {data ? <Success /> : <Confirmation />}

      <Flex>
        <Button variant="transparent" onClick={prev}>
          Previous
        </Button>
      </Flex>
      {!account ? (
        <Warning warning="Your wallet is not connected. Please connect." />
      ) : (
        <Button
          variant="cta"
          css={{ width: '100%' }}
          onClick={deployKaliDao}
          disabled={isWritePending || isWriteSuccess}
        >
          {isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>}
        </Button>
      )}
    </Flex>
  )
}
