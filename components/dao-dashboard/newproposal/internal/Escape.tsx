import React, { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { Warning } from '@components/ui/warning'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { zeroAddress } from 'viem'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/createProposal'
import { Button } from '@components/ui/button'

type EscapeProps = {
  dao: string
  chainId: number
  kill: number
  title: string
  content: { [key: string]: any } | undefined
}

// TODO: Show this along with process proposal
export default function Escape({ dao, chainId, kill, title, content }: EscapeProps) {
  // Contract functions
  const { writeContractAsync } = useWriteContract()

  // State
  const [warning, setWarning] = useState('')

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!dao || !chainId || !kill) return

    if (!title) {
      setWarning('You must provide a title')
      return
    }

    if (!chainId) {
      setWarning('Please connect your wallet')
      return
    }

    let docs
    try {
      docs = await createProposal(dao, chainId, 10, title, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    try {
      const tx = await writeContractAsync?.({
        address: dao as `0xstring`,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [
          10, // ESCAPE prop
          docs,
          [zeroAddress],
          [BigInt(kill)],
          [],
        ],
      })
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <div>
      <div className="flex flex-row">
        <p>This action will create a proposal to delete</p>
        <p className="font-bold text-red-500">proposal #{kill}</p>
        <p>and remove it from the queue.</p>
      </div>
      {warning !== '' && <Warning warning={warning} />}
      <Button onClick={submit}>Confirm</Button>
    </div>
  )
}
