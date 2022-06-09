import { useStateMachine } from 'little-state-machine'
import { AddressZero } from '@ethersproject/constants'
import { Button, Flex, Text, Warning } from '../../styles/elements'
import { useAccount, useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi'
import { useCallback } from 'react'
import { addresses } from '../../constants/addresses'
import FACTORY_ABI from '../../abi/KaliDAOfactory.json'
import { votingPeriodToSeconds, validateDocs } from '../../utils/'
import { ethers } from 'ethers'
import { CheckIcon, Cross1Icon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../styles/elements/Accordion'
import { GiToken } from 'react-icons/gi'
import { RiGovernmentFill, RiAppsFill } from 'react-icons/ri'
import { GoLaw } from 'react-icons/go'

export const Row = ({ name, value }) => {
  return (
    <Flex
      dir="row"
      align="separate"
      css={{
        boxShadow: 'rgba(10, 10, 10, 0.9) 1px 1px 6px 0px inset, rgba(10, 10, 10, 0.9) -1px -1px 6px 1px inset',
        padding: '0.5rem',
      }}
    >
      <Text>{name}</Text>
      <Text>{value}</Text>
    </Flex>
  )
}

export default function Confirm({ setStep }) {
  const { state } = useStateMachine()
  const { hardMode } = state
  const { data: account } = useAccount()
  const { activeChain } = useNetwork()
  const {
    data,
    writeAsync,
    isLoading: isWritePending,
    isError,
    error,
  } = useContractWrite(
    {
      addressOrName: activeChain?.id ? addresses[activeChain.id]['factory'] : AddressZero,
      contractInterface: FACTORY_ABI,
    },
    'deployKaliDAO',
    {
      onSuccess() {
        console.log('success!', data)
      },
    },
  )
  const { data: transaction, isLoading: isTransactionPending } = useWaitForTransaction({
    hash: data?.hash,
  })

  const validateFounders = (founders) => {
    let voters = []
    let shares = []

    for (let i = 0; i < founders.length; i++) {
      voters.push(founders[i]['member'])
      shares.push(ethers.utils.parseEther(founders[i]['share']))
    }

    return { voters, shares }
  }

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
      const redemptionStart = state['redemption-start']
      console.log('redemptionStart', redemptionStart)
      extensionsArray.push(addresses[activeChain?.id]['extensions']['redemption'])
    }
    // crowdsale
    if (state.redemption === true) {
      extensionsArray.push(addresses[activeChain?.id]['extensions']['redemption'])
    }
    console.log(govSettings)
    console.log(
      'hard deploy params',
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
  }, [account, state, writeAsync])

  const prev = () => {
    if (!hardMode) {
      setStep('founders')
    } else {
      setStep('legal')
    }
  }
  const formatVotingPeriodUnit = (unit) => {
    switch (unit) {
      case 'day': {
        return 'Days'
      }
      case 'hour': {
        return 'Hours'
      }
      case 'min': {
        return 'Minutes'
      }
    }
  }

  const DeploymentInfo = () => {
    return (
      <Accordion type="single" defaultValue="token" collapsible>
        <AccordionItem value="token">
          <AccordionTrigger>
            <Flex
              css={{
                gap: '8px',
              }}
            >
              <GiToken />
              Token
            </Flex>
          </AccordionTrigger>
          <AccordionContent>
            <Row name="Name" value={state.name} />
            <Row name="Symbol" value={state.symbol} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="gov">
          <AccordionTrigger>
            <Flex
              css={{
                gap: '8px',
              }}
            >
              <RiGovernmentFill />
              Governance
            </Flex>
          </AccordionTrigger>
          <AccordionContent>
            <Row name="Participation Needed" value={`${state.quorum}%`} />
            <Row name="Approval Needed" value={`${state.approval}%`} />
            <Row
              name="Voting Period"
              value={`${state.votingPeriod} ${formatVotingPeriodUnit(state.votingPeriodUnit)}`}
            />
            <Row
              name="Token Transferability"
              value={state.transferability === true ? <CheckIcon color="green" /> : <Cross1Icon color="red" />}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="apps">
          <AccordionTrigger>
            <Flex
              css={{
                gap: '8px',
              }}
            >
              <RiAppsFill />
              Apps
            </Flex>
          </AccordionTrigger>
          <AccordionContent>
            <Row name="Tribute" value={<CheckIcon color="green" />} />
            <Row name="Crowdsale" value={state.crowdsale ? <CheckIcon color="green" /> : <Cross1Icon color="red" />} />
            <Row
              name="Redemption"
              value={state.redemption ? <CheckIcon color="green" /> : <Cross1Icon color="red" />}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="legal">
          <AccordionTrigger>
            <Flex
              css={{
                gap: '8px',
              }}
            >
              <GoLaw />
              Legal
            </Flex>
          </AccordionTrigger>
          <AccordionContent>
            <Row name="Entity" value={hardMode ? <CheckIcon /> : <Cross1Icon color="red" />} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  return (
    <Flex dir="col">
      <DeploymentInfo />
      {isError && (
        <Flex
          gap="sm"
          css={{
            background: '$red500',
            padding: '0.5rem',
            borderRadius: 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontWeight: '800',
          }}
        >
          <ExclamationTriangleIcon />
          {error.message}
        </Flex>
      )}
      {data && (
        <Flex>
          {transaction?.confirmations}
          <a href={`https://rinkeby.etherscan.io/tx/${data?.hash}`} target="_blank" rel="noreferrer noopener">
            View on Block Explorer.
          </a>
        </Flex>
      )}
      <Flex>
        <Button variant="transparent" onClick={prev}>
          Previous
        </Button>
      </Flex>
      {!account ? (
        <Warning warning="Your wallet is not connected. Please connect." />
      ) : (
        <Button variant="primary" css={{ width: '100%' }} onClick={deployKaliDao} disabled={isWritePending}>
          {isWritePending ? <div>Confirm Deployment</div> : <div>Deploy</div>}
        </Button>
      )}
    </Flex>
  )
}
