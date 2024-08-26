import { useCallback, useState } from 'react'
import { useStateMachine } from 'little-state-machine'
import { useAccount, usePublicClient, useWriteContract } from 'wagmi'
import { useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@components/ui/button'
import { Loader2 } from 'lucide-react'

import validateDocs from './validateDocs'
import { votingPeriodToSeconds } from '@utils/index'
import { getRedemptionTokens } from '@utils/getRedemptionTokens'
import { validateFounders } from './validateFounders'
import Confirmation from './Confirmation'

import { addresses } from '@constants/addresses'
import { FACTORY_ABI } from '@abi/KaliDAOfactory'
import { REDEMPTION_ABI } from '@abi/KaliDAOredemption'
import { SALE_ABI } from '@abi/KaliDAOcrowdsale'
import { templates, handleEmail } from '@utils/handleEmail'
import { encodeAbiParameters, encodeFunctionData, parseAbiParameters, parseEther, zeroAddress } from 'viem'

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function Checkout({ setStep }: Props) {
  const router = useRouter()
  const { state } = useStateMachine()
  const { hardMode } = state
  const { isConnected, chain: activeChain } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const publicClient = usePublicClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>()

  const deployKaliDao = useCallback(async () => {
    setLoading(true)
    setMessage('Preparing transaction...')
    if (!isConnected || !activeChain) return
    if (!publicClient) return

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
      const redemptionPayload = encodeAbiParameters(parseAbiParameters('uint256[] a, uint32[] b'), [
        tokenArray,
        [starts],
      ])
      const payload = encodeFunctionData({
        abi: REDEMPTION_ABI,
        functionName: 'setExtension',
        args: [redemptionPayload],
      })

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

      const saleExtensionPayload = encodeAbiParameters(
        parseAbiParameters('uint256, uint8, address, uint32, uint96, uint96, string'),
        [
          0n,
          purchaseMultiplier,
          token,
          ends,
          parseEther(purchaseLimit.toString()),
          parseEther(personalLimit.toString()),
          'documentation',
        ],
      )
      const payload = encodeFunctionData({
        abi: SALE_ABI,
        functionName: 'setExtension',
        args: [saleExtensionPayload],
      })
      extensionsArray.push(addresses[activeChain?.id]['extensions']['crowdsale2'])
      extensionsData.push(payload)
    }

    try {
      setMessage(`Please confirm in your wallet.`)

      const tx = await writeContractAsync({
        address: activeChain?.id ? (addresses[activeChain.id]['factory'] as `0x${string}`) : zeroAddress,
        abi: FACTORY_ABI,
        functionName: 'deployKaliDAO',
        args: [
          name,
          symbol,
          docs_,
          Boolean(!transferability),
          extensionsArray,
          extensionsData,
          voters,
          shares,
          govSettings,
        ],
      })
      if (tx) {
        setMessage(`Transaction sent!`)
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: tx,
        })

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
  }, [isConnected, activeChain, state, writeContractAsync, router])

  const prev = () => {
    if (!hardMode) {
      setStep(4)
    } else {
      setStep(5)
    }
  }

  return (
    <div className="space-y-4">
      {/* Error handling needs to be adjusted as isError and error are no longer available */}
      <Confirmation />
      <Button variant="outline" onClick={prev}>
        Previous
      </Button>
      {message && <p className="text-sm text-gray-500">{message}</p>}
      {!isConnected ? (
        <ConnectButton label="Login" />
      ) : (
        <Button className="w-full" onClick={deployKaliDao} disabled={loading}>
          {loading ? (
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
