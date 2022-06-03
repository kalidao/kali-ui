import { useStateMachine } from 'little-state-machine'
import { AddressZero } from '@ethersproject/constants'
import { Button, Flex } from '../../styles/elements'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useCallback } from 'react'
import { addresses } from '../../constants/addresses'
import FACTORY_ABI from '../../abi/KaliDAOfactory.json'
import { votingPeriodToSeconds, validateDocs } from '../../utils/'
import { computeKaliAddress } from '../../utils/'

export default function Confirm({ setStep, hardMode }) {
  const { state } = useStateMachine()
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const {
    writeAsync,
    isLoading: isWritePending,
    isError,
  } = useContractWrite(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'deployKaliDAO',
    {
      onSuccess() {
        console.log('success!')
      },
    },
  )

  const deployEasyDao = async () => {
    const { name, symbol, founders } = state

    const voteTime = votingPeriodToSeconds(2, 'day')

    // voter, shares
    let voters = []
    let shares = []
    for (let i = 0; i < founders.length; i++) {
      voters.push(founders[i]['member'])
      shares.push(founders[i]['share'])
    }

    // no quorum
    // simple majority
    const govSettings = Array(voteTime, 0, 0, 50)
    govSettings = govSettings.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    // extensions
    const extensionArray = new Array()
    const extensionData = new Array()

    // docs
    const docs = 'none'
    //   image:
    //   socialLink:
    //   agreement:
    // }

    // ricardian = ''
    console.log(
      'deploy param basic',
      name,
      symbol,
      docs,
      Number(true),
      extensionArray,
      extensionData,
      voters,
      shares,
      govSettings,
    )

    const data = await writeAsync({
      args: [name, symbol, docs, Number(true), extensionArray, extensionData, voters, shares, govSettings],
    })

    if (data.wait()) return
  }
  const deployKaliDao = useCallback(async () => {
    if (!account) return

    if (!hardMode) {
      deployEasyDao()
    } else {
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
        docType,
        email,
      } = state

      const docs_ = validateDocs(
        docType,
        state.existingDocs ? state.existingDocs : null,
        name,
        state.mission ? state.mission : null,
      )
      const voteTime = votingPeriodToSeconds(votingPeriod, votingPeriodUnit)
      console.log('docs', docs_)

      // get voters and shares array

      let voters = []
      let shares = []
      for (let i = 0; i < founders.length; i++) {
        voters.push(founders[i]['member'])
        shares.push(founders[i]['share'])
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
      const govSettings = Array(voteTime, 0, quorum, approval)

      if (approval > 50) {
        govSettings = govSettings.concat([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3])
      } else {
        govSettings = govSettings.concat([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
      }

      const extensionArray = new Array()
      const extensionData = new Array()

      console.log(govSettings)
      const data = await writeAsync({
        args: [name, symbol, docs_, Number(paused), extensionArray, extensionData, voters, shares, govSettings],
      })

      if (data.wait()) return
    }
  }, [account, state, writeAsync])

  const prev = () => {
    if (!hardMode) {
      setStep('founders')
    } else {
      setStep('legal')
    }
  }

  
  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <pre>{JSON.stringify(isError, null, 2)}</pre>
      <Flex>
        <Button variant="transparent" onClick={prev}>
          Previous
        </Button>
      </Flex>
      <Button variant="primary" css={{ width: '100%' }} onClick={deployKaliDao} disabled={isWritePending}>
        {isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>}
      </Button>
    </div>
  )
}
