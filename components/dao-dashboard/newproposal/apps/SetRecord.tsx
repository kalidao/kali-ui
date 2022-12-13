import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Stack, Input, Box, Text, Button, FieldSet, FileInput, Textarea, IconClose, Checkbox, IconUserSolid } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import DATAROOM_ABI from '@abi/DataRoom.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils'
import { ProposalProps } from '../utils/types'
import { createDataRoomDetails } from './createDataRoomDetails'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'

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
  const [toExpand, setToExpand] = useState(false)
  const [status, setStatus] = useState<string>()
  const [shareStatus, setShareStatus] = useState<string>()
  const [tags, setTags] = useState<string[]>([])
  const [users, setUsers] = useState<string[]>([])

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    let _tags: Array<string> = []
    _tags = raw.split(" ")
    setTags(_tags)
  }

  const handleExpand = () => {
    setToExpand(true)
  }

  const handleAddresses = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    let _addresses: Array<string> = []
    _addresses = raw.split(", ")
    setUsers(_addresses)
  }

  const validateData = async (data: string[]) => {
    if (!data) return

    for (let i = 0; i < data.length; i++) {
      if (!ethers.utils.isAddress(data[i])) {
        try {
          const res = await fetchEnsAddress(data[i])
          if (res && ethers.utils.isAddress(res)) {
            data[i] = res as string
          } else {
            return false
          }
        } catch (e) {
          return false
        }
      }
    }

    return data
  }


  const submitPermissionUpdate = async () => {
    setShareStatus("Validating addresses...")
    const _users = await validateData(users)
    let auths: boolean[] = []

    if (!_users) {
      setWarning("Validation failed.")
      setShareStatus("Try Again")    
      return  
    } else {
      for (let i: number = 0; i < _users.length; i++) {
        auths.push(true)
      }
      setWarning("")
    }


    setShareStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    console.log(_users, auths)
  
    let iface = new ethers.utils.Interface(DATAROOM_ABI)
    let payload = iface.encodeFunctionData('setPermission', [daoAddress, _users, auths])
    console.log('Proposal Params - ', 2, docs, [dataRoomAddress], [0], [payload])

    setShareStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [dataRoomAddress],
        [0],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setShareStatus('Proposed.')
  }

  const submit = async () => {
    setStatus('Creating proposal...')
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    setStatus('Uploading document to IPFS...')
    let recordHash  
    recordHash = await createDataRoomDetails(daoAddress, chainId, tags, record)

    if (recordHash == '') {
      setWarning('Error uploading record.')
      setStatus('')
      return
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
    let payload = iface.encodeFunctionData('setRecord', [daoAddress, [recordHash]])
    console.log('Proposal Params - ', 2, docs, [dataRoomAddress], [0], [payload])

    setStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await kalidao.propose(
        2, // CALL prop
        docs,
        [dataRoomAddress],
        [0],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setStatus('Proposed.')
  }

  useEffect(() => {
    const toggleButton = async () => {
      if (record && tags.length > 0) {
        setIsEnabled(true)
      } else {
        setIsEnabled(false)
      }
    }

    toggleButton()

  }, [record, tags])

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
      {
        !toExpand && (
      <Button 
        width={'min'}  
        onClick={handleExpand} 
      >
        Share Access
      </Button>
      )}
      
      {toExpand && 
        <Stack direction={'horizontal'} align='center'>
          <Input
          label="Addresses"
          description="Invite and share access with otheres. Separate ENS/address by single comma, e.g., 'abc.eth, def.eth' "
          name="tags"
          type="text"
          onChange={handleAddresses}
          />
          <Button 
            width={'min'}  
            onClick={submitPermissionUpdate} 
            >
            {shareStatus ? shareStatus : 'Grant Access'}
          </Button>
          <Button 
            width={'min'}  
            tone={'red'}
            onClick={() => setToExpand(!toExpand)}
            >
            Cancel
          </Button>
        </Stack>
        }
      

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
