import React, { useState } from 'react'
import { useContractWrite, useContractRead } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import Editor from '@components/editor'
import { createProposal } from '../utils'
import { FieldSet, Text, Button, Input } from '@kalidao/reality'

export default function ToggleTransfer() {
  // Router
  const router = useRouter()
  const { dao, chainId } = router.query

  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState()
  const [warning, setWarning] = useState<string>()
  const [loading, setLoading] = useState(false)
  // Contract functions
  const { writeAsync, isSuccess } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
  })
  const { data: paused } = useContractRead({
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'paused',
    chainId: Number(chainId),
  })

  // TODO: Popup to change network if on different network from DAO
  const submit = async () => {
    setLoading(true)
    if (!dao || !chainId || !title) return
    let docs
    try {
      docs = await createProposal(dao as string, Number(chainId), 8, title, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    // console.log('Proposal Params - ', 8, docs, [AddressZero], [0], [Array(0)])
    try {
      const tx = await writeAsync({
        recklesslySetUnpreparedArgs: [
          8, // PAUSE prop
          docs,
          [AddressZero],
          [0],
          [Array(0)],
        ],
      })
    } catch (e) {
      console.log('error', e)
    }
    setLoading(false)
  }

  return (
    <FieldSet legend="Toggle Transfer" description="Submit proposal to pause or unpause DAO token transferability.">
      <Input
        name="id"
        label="Title"
        maxLength={30}
        placeholder={'Proposal for...'}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor setContent={setContent} />
      <Text>{paused ? 'The token is currently not transferable' : 'The token is currently transferable'}</Text>

      <Button onClick={submit} disabled={isSuccess}>
        Submit
      </Button>
    </FieldSet>
  )
}
