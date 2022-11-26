import React, { useState } from 'react'
import { useContractWrite, useContractRead } from 'wagmi'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import Editor from '@components/editor'
import { createProposal } from '../utils'
import { FieldSet, Text, Button, Input } from '@kalidao/reality'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { JSONContent } from '@tiptap/react'

export default function ToggleTransfer() {
  // Router
  const router = useRouter()
  const { dao, chainId } = router.query

  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<JSONContent>()
  const [warning, setWarning] = useState<string>()
  const [loading, setLoading] = useState(false)
  // Contract functions
  const { writeAsync, isSuccess } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? (dao as string) : AddressZero,
    contractInterface: KALIDAO_ABI,
    functionName: 'propose',
    chainId: Number(chainId),
    onSuccess: () => {
      setTimeout(() => {
        setLoading(false)
        router.push(`/daos/${chainId}/${dao}/`)
      }, 35000)
    },
    onError: (e) => {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      setLoading(false)
    },
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
  }

  return (
    <FieldSet
      legend="Toggle Transfer"
      description={`Submit proposal to pause or unpause DAO token transferability. ${
        paused ? 'The token is currently not transferable' : 'The token is currently transferable'
      }`}
    >
      <Input
        name="id"
        label="Title"
        maxLength={30}
        placeholder={'Proposal for...'}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        setContent={setContent}
        placeholder="You can describe your proposal here."
        label="Details"
        description="Why should the token transferability be flipped?"
      />
      <ChainGuard fallback={<Button>Submit</Button>}>
        <Button onClick={submit} disabled={isSuccess} loading={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </ChainGuard>
    </FieldSet>
  )
}
