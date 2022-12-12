import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Stack, Input, Box, Text, Button, FieldSet, FileInput, Textarea } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import DATAROOM_ABI from '@abi/DataRoom.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils'
import { ProposalProps } from '../utils/types'
import { JSONContent } from '@tiptap/react'
import { createDataRoomDetails } from './createDataRoomDetails'

export default function SetRecord({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const { data: signer } = useSigner()
  const dataRoomAddress = addresses[chainId]['extensions']['dataRoom']

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [record, setRecords] = useState<File>()
  const [warning, setWarning] = useState<string>()
  const [isEnabled, setIsEnabled] = useState(false)
  const [status, setStatus] = useState<string>()
  const [tags, setTags] = useState<string[]>([])

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    let _tags: Array<string> = []
    _tags = raw.split(" ")
    setTags(_tags)
  }

  const submit = async () => {
    setStatus('Creating proposal...')
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    setStatus('Uploading document to IPFS...')
    let recordHash
    if (!record) {
      recordHash = 'none'
    } else {
      recordHash = await createDataRoomDetails(daoAddress, chainId, tags, record)

      if (recordHash == '') {
        setWarning('Error uploading record.')
        setStatus('')
        return
      }
    }

    setStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    let iface = new ethers.utils.Interface(DATAROOM_ABI)
    const encodedParams = ethers.utils.defaultAbiCoder.encode(['address', 'string[]'], [daoAddress, [recordHash]])
    let payload = iface.encodeFunctionData('setRecord', [encodedParams])
    console.log('Proposal Params - ', 2, docs, [dataRoomAddress], [0], [payload])

    setStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [dataRoomAddress],
        [1],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setStatus('Proposed.')
  }

  useEffect(() => {  }, [  ])

  return (
    <FieldSet
      legend="Data Room"
      description="The Data Room extension allows DAOs to ratify off-chain activities and documents on-chain. You may describe them in Details above or upload a document (i.e., .pdf) below for members to vote on."
    >      
      <FileUploader
        label="Document"
        description="Upload a document describing the off-chain activities for ratification. Any document uploaded will live on IPFS."
        setFile={setRecords}
      />

      <Input
        label="Tags"
        description="Add tags to better organize this ratified activity. Separate tags with a space!"
        name="tags"
        type="text"
        onChange={handleTags}
      />
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button width={'full'} disabled={!isEnabled} onClick={submit}>
          {status ? status : 'Ratify Off-Chain Activity'}
        </Button>
      </Stack>
    </FieldSet>
  )
}
