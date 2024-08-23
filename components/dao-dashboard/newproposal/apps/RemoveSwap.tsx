import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useWriteContract } from 'wagmi'
import { Checkbox } from '@components/ui/checkbox'
import { Button } from '@components/ui/button'
import { Alert, AlertDescription } from '@components/ui/alert'
import { ArrowLeft } from 'lucide-react'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { addresses } from '@constants/addresses'
import { createProposal } from '../utils/createProposal'
import { ProposalProps } from '../utils/types'
import { Address, encodeAbiParameters, parseAbiParameters, zeroAddress } from 'viem'

export default function RemoveSwap({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const crowdsaleAddress = addresses[chainId]['extensions']['crowdsale2']
  const { writeContractAsync } = useWriteContract()
  const [toggleConfirm, setToggleConfirm] = useState(false)
  const [warning, setWarning] = useState<string>()
  const [status, setStatus] = useState<string>()

  const submit = async () => {
    setStatus('Creating proposal...')
    if (toggleConfirm === false) return
    setStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress as string, Number(chainId), 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }
    setStatus('Encoding swap details...')
    let payload
    try {
      const abiCoder = encodeAbiParameters(
        parseAbiParameters('uint256 a, uint8 b, address c, uint32 d, uint96 e, uint96 f, string g'),
        [0n, 1, zeroAddress, 946702800, 0n, 0n, 'none'],
      )
      // )) ethers.utils.defaultAbiCoder
      //   payload = abiCoder.encode(
      //     ['uint256', 'uint8', 'address', 'uint32', 'uint96', 'uint96', 'string'],
      //     [0, 1, zeroAddress, 946702800, 0, 0, 'none'],
      //   )
      console.log(payload)
    } catch (e) {
      setWarning('Error formatting crowdsale setExtension() parameters.')
      console.log(e)
      return
    }
    console.log('Proposal Params - ', 9, docs, [crowdsaleAddress], [1], [payload])
    setStatus('Creating proposal...')
    try {
      await writeContractAsync({
        address: daoAddress as Address,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [
          9, // EXTENSION prop
          docs,
          [crowdsaleAddress],
          [1n],
          [payload],
        ],
      })
    } catch (e) {
      console.log('error', e)
      setWarning('Error creating proposal.')
    }
    setStatus('Proposed.')
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Swap</h2>
        <p className="text-sm text-gray-500">Please confirm and submit this removal proposal to remove current Swap.</p>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="confirm" checked={toggleConfirm} onCheckedChange={() => setToggleConfirm(!toggleConfirm)} />
        <label
          htmlFor="confirm"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Confirm to submit this Swap removal proposal
        </label>
      </div>
      {warning && (
        <Alert variant="destructive">
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setProposal?.('appsMenu')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={submit}>{status ? status : 'Remove Swap'}</Button>
      </div>
    </div>
  )
}
