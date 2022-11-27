import { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { useStateMachine } from 'little-state-machine'
import { AddressZero } from '@ethersproject/constants'
import { useAccount, useContractWrite, useNetwork, useTransaction } from 'wagmi'

import validateDocs from './validateDocs'
import { votingPeriodToSeconds } from '@utils/index'
import { getRedemptionTokens } from '@utils/getRedemptionTokens'
import { validateFounders } from './validateFounders'

import { Warning } from '@design/elements'
import { Stack, Button, Text } from '@kalidao/reality'
import Confirmation from './Confirmation'

import { addresses } from '@constants/addresses'
import FACTORY_ABI from '@abi/KaliDAOfactory.json'
import REDEMPTION_ABI from '@abi/KaliDAOredemption.json'
import SALE_ABI from '@abi/KaliDAOcrowdsale.json'
import { templates, handleEmail } from '@utils/handleEmail'
import { useRouter } from 'next/router'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Checkout({ setStep }: Props) {
  const router = useRouter()
  const { state } = useStateMachine()
  const { hardMode } = state
  const { isConnected } = useAccount()
  const { chain: activeChain } = useNetwork()
  const [txHash, setTxHash] = useState<string>()
  const { data: txDetails } = useTransaction({
    hash: txHash as `0x${string}`,
    enabled: !!txHash,
  })
  const {
    data,
    writeAsync,
    isLoading: isWritePending,
    isSuccess: isWriteSuccess,
    isError,
    error,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : AddressZero,
    contractInterface: FACTORY_ABI,
    functionName: 'deployKaliDAO',
    onSuccess(data) {
      setTxHash(data.hash)
      data.wait(1).then(async () => {
        if (!txDetails) return
        const params = {
          dao: txDetails?.to as string,
          network: activeChain?.id as number,
          email: state.email,
          entity_type: state.docType,
        }
        await handleEmail(templates['deployment'], params)
        router.push(`/daos/${activeChain?.id}/${txDetails?.to}`)
      })
    },
  })

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

    let docs_
    if (legal) {
      docs_ = validateDocs(docType, state.existingDocs)
    } else {
      docs_ = 'na'
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

    const extensionsArray = new Array()
    const extensionsData = new Array()

    // tribute
    extensionsArray.push(addresses[activeChain?.id]['extensions']['tribute'])
    extensionsData.push('0x')

    // redemption
    if (state.redemption === true) {
      let { redemptionStart } = state
      const starts = Number(new Date(redemptionStart).getTime() / 1000)
      const tokenArray = getRedemptionTokens(activeChain?.id)

      const iface = new ethers.utils.Interface(REDEMPTION_ABI)
      const encodedParams = ethers.utils.defaultAbiCoder.encode(['address[]', 'uint256'], [tokenArray, starts])
      const payload = iface.encodeFunctionData('setExtension', [encodedParams])

      extensionsArray.push(addresses[activeChain?.id]['extensions']['redemption'])
      extensionsData.push(payload)
    }
    // crowdsale
    if (state.crowdsale === true) {
      const { purchaseMultiplier, purchaseLimit, purchaseToken, personalLimit, crowdsaleEnd } = state
      let token
      if (purchaseToken === 'eth') {
        token = '0x000000000000000000000000000000000000dead'
      }
      if (purchaseToken === 'custom') {
        token = state.customTokenAddress
      }

      let ends = Number(new Date(crowdsaleEnd).getTime() / 1000)

      const iface = new ethers.utils.Interface(SALE_ABI)
      const encodedData = new ethers.utils.AbiCoder().encode(
        ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
        [
          0,
          purchaseMultiplier,
          token,
          ends,
          ethers.utils.parseEther(purchaseLimit.toString()),
          ethers.utils.parseEther(personalLimit.toString()),
          'documentation',
        ],
      )
      const payload = iface.encodeFunctionData('setExtension', [encodedData])

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
    const tx = await writeAsync({
      recklesslySetUnpreparedArgs: [
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
      recklesslySetUnpreparedOverrides: {
        gasLimit: 1600000,
      },
    }).catch((e) => {
      console.log('error', e.code, e.reason)
    })
  }, [isConnected, activeChain, state, writeAsync])

  const prev = () => {
    if (!hardMode) {
      setStep(4)
    } else {
      setStep(5)
    }
  }

  return (
    <Stack>
      {isError && <Text>{error?.message}</Text>}
      <Confirmation />
      <Button variant="transparent" onClick={prev}>
        Previous
      </Button>
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
