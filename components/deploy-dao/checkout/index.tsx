import { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { useStateMachine } from 'little-state-machine'
import { AddressZero } from '@ethersproject/constants'
import { useAccount, useContractWrite, useNetwork } from 'wagmi'
import { useRouter } from 'next/router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Loader2 } from 'lucide-react'

import validateDocs from './validateDocs'
import { votingPeriodToSeconds } from '@utils/index'
import { getRedemptionTokens } from '@utils/getRedemptionTokens'
import { validateFounders } from './validateFounders'
import Confirmation from './Confirmation'

import { addresses } from '@constants/addresses'
import FACTORY_ABI from '@abi/KaliDAOfactory.json'
import REDEMPTION_ABI from '@abi/KaliDAOredemption.json'
import SALE_ABI from '@abi/KaliDAOcrowdsale.json'
import { templates, handleEmail } from '@utils/handleEmail'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Checkout({ setStep }: Props) {
  const router = useRouter()
  const { state } = useStateMachine()
  const { hardMode } = state
  const { isConnected } = useAccount()
  const { chain: activeChain } = useNetwork()
  const {
    writeAsync,
    isLoading: isWritePending,
    isSuccess: isWriteSuccess,
    isError,
    error,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: activeChain?.id ? (addresses[activeChain.id]['factory'] as `0xstring`) : AddressZero,
    abi: FACTORY_ABI,
    functionName: 'deployKaliDAO',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()

  const deployKaliDao = useCallback(async () => {
    setLoading(true)
    setMessage('Preparing transaction...')
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
    } = state

    let docs_
    if (legal) {
      docs_ = validateDocs(docType, state.existingDocs)
    } else {
      docs_ = 'na'
    }

    const voteTime = votingPeriodToSeconds(votingPeriod, votingPeriodUnit)

    const { voters, shares } = validateFounders(founders)

    let govSettings
    if (approval > 51) {
      govSettings = new Array(voteTime, 0, quorum, approval, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3)
    } else {
      govSettings = new Array(voteTime, 0, quorum, 52, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
    }

    const extensionsArray = new Array()
    const extensionsData = new Array()

    extensionsArray.push(addresses[activeChain?.id]['extensions']['tribute'])
    extensionsData.push('0x')

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

    try {
      setMessage(`Please confirm in your wallet.`)

      const tx = await writeAsync?.({
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
      })
      if (tx) {
        setMessage(`Transaction sent!`)
        const receipt = await tx.wait(1)
        receipt.logs.forEach(async (log: any) => {
          setMessage(`Transaction confirmed!`)
          if (log.topics[0] === '0x0712ea2ebe8ee974f78171c5f86c898cc0e2858fb69ed676083f8c60ee84ab12') {
            const daoAddress = '0x' + log.topics[1].slice(-40)
            try {
              const params = {
                dao: daoAddress,
                network: activeChain?.id as number,
                email: state.email,
                entity_type: state.docType,
              }
              await handleEmail(templates['deployment'], params)
              router.push(`/daos/${activeChain?.id}/${daoAddress}`)
            } catch (e: any) {
              console.log('error', e.code, e.reason)
              setMessage(`${state.name} has been succesfully deployed. You will find it on homepage.`)
              setLoading(false)
            }
          }
        })
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
      setMessage('Transaction failed.')
    }
  }, [isConnected, activeChain, state, writeAsync, router])

  const prev = () => {
    if (!hardMode) {
      setStep(4)
    } else {
      setStep(5)
    }
  }

  return (
    <div className="space-y-4">
      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}
      <Confirmation />
      <Button variant="outline" onClick={prev}>
        Previous
      </Button>
      {message && <p className="text-sm text-gray-500">{message}</p>}
      {!isConnected ? (
        <ConnectButton label="Login" />
      ) : (
        <Button className="w-full" onClick={deployKaliDao} disabled={isWritePending || isWriteSuccess || loading}>
          {isWritePending || loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirm Deployment
            </>
          ) : (
            'Deploy'
          )}
        </Button>
      )}
    </div>
  )
}
