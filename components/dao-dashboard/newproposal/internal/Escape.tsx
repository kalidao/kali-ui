import React, { useState } from 'react'
import { useContractWrite } from 'wagmi'
import { Warning } from '@design/elements'
import { Stack, Text, Button } from '@kalidao/reality'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { AddressZero } from '@ethersproject/constants'
import { createProposal } from '@components/dao-dashboard/newproposal/utils/'

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
  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: dao as `0xstring`,
    abi: KALIDAO_ABI,
    functionName: 'propose',
    chainId: chainId,
  })

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
      const tx = await writeAsync?.({
        recklesslySetUnpreparedArgs: [
          10, // ESCAPE prop
          docs,
          [AddressZero],
          [kill],
          [Array(0)],
        ],
      })
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Stack>
      <Stack direction={'horizontal'}>
        <Text>This action will create a proposal to delete</Text>
        <Text weight={'bold'} color="red">
          proposal #{kill}
        </Text>
        <Text>and remove it from the queue.</Text>
      </Stack>
      {warning !== '' && <Warning warning={warning} />}
      <Button onClick={submit}>Confirm</Button>
    </Stack>
  )
}
