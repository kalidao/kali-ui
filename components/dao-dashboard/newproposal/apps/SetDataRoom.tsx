import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ethers } from 'ethers'
import { useWriteContract } from 'wagmi'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { X } from 'lucide-react'
import FileUploader from '@components/tools/FileUpload'
import { KALIDAO_ABI } from '@abi/KaliDAO'
import { DATAROOM_ABI } from '@abi/DataRoom'
import { addresses } from '@constants/addresses'
import { Warning } from '@components/ui/warning'
import { Back } from '@components/ui/back'
import { createProposal } from '../utils/createProposal'
import { ProposalProps } from '../utils/types'
import { createDataRoomDetails } from './createDataRoomDetails'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { Address, Hex } from 'viem'

export default function SetDataRoom({ setProposal, title, content }: ProposalProps) {
  const params = useParams<{ chainId: string; dao: Address }>()
  const chainId = params ? Number(params.chainId) : 1
  const daoAddress = params?.dao
  const dataRoomAddress = addresses[chainId]['extensions']['dataRoom']

  const { writeContractAsync } = useWriteContract()

  // form
  const [record, setRecords] = useState<File>()
  const [warning, setWarning] = useState<string>()
  const [isEnabled, setIsEnabled] = useState(false)
  const [toExpand, setToExpand] = useState(false)
  const [status, setStatus] = useState<string>()
  const [shareStatus, setShareStatus] = useState<string>()
  const [name, setName] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [users, setUsers] = useState<string[]>([])

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    let _tags: Array<string> = []
    _tags = raw.split(', ')
    setTags(_tags)
  }

  const handleExpand = () => {
    setToExpand(true)
  }

  const handleAddresses = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    let _addresses: Array<string> = []
    _addresses = raw.split(', ')
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
    setShareStatus('Validating addresses...')
    const _users = await validateData(users)
    let auths: boolean[] = []

    if (!_users) {
      setWarning('Validation failed.')
      setShareStatus('Try Again')
      return
    } else {
      for (let i: number = 0; i < _users.length; i++) {
        auths.push(true)
      }
      setWarning('')
    }

    setShareStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress!, chainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    let iface = new ethers.utils.Interface(DATAROOM_ABI)
    let payload = iface.encodeFunctionData('setPermission', [daoAddress, _users, auths])
    console.log('Proposal Params - ', 2, docs, [dataRoomAddress], [0], [payload])

    setShareStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await writeContractAsync({
        address: daoAddress!,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [
          2, // CALL prop
          docs,
          [dataRoomAddress],
          [0n],
          [payload as Hex],
        ],
      })
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setShareStatus('Proposed.')
  }

  const submit = async () => {
    setStatus('Creating proposal...')

    setStatus('Uploading document to IPFS...')
    let recordHash
    recordHash = await createDataRoomDetails(daoAddress!, chainId, name, tags, record)
    console.log(name, tags, record)

    if (recordHash == '') {
      setWarning('Error uploading record.')
      setStatus('')
      return
    }

    setStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress!, chainId, 9, title, content)
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
      const tx = await writeContractAsync({
        address: daoAddress!,
        abi: KALIDAO_ABI,
        functionName: 'propose',
        args: [
          2, // CALL prop
          docs,
          [dataRoomAddress],
          [0n],
          [payload as Hex],
        ],
      })
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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Data Room</h2>
        <p className="text-sm text-gray-500">
          The Data Room extension allows DAOs to ratify off-chain activities and documents on-chain. DAOs may also
          designate others, such as a DAO operator, to ratify off-chain activities without having to go through the
          proposal mechanism. Note, however, that a vote is required to share access to such DAO operator.
        </p>
      </div>

      {!toExpand && <Button onClick={handleExpand}>Share Access</Button>}

      {toExpand && (
        <div className="flex items-center space-x-4">
          <Input placeholder="Addresses" onChange={handleAddresses} />
          <Button onClick={submitPermissionUpdate}>{shareStatus ? shareStatus : 'Grant Access'}</Button>
          <Button variant="destructive" onClick={() => setToExpand(!toExpand)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

      <FileUploader
        label="Document"
        description="Upload a document describing the off-chain activities for ratification. Any document uploaded will live on IPFS."
        setFile={setRecords}
      />

      <Input placeholder="Tags" onChange={handleTags} />

      {warning && <Warning warning={warning} />}

      <div className="flex justify-between items-center">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button disabled={!isEnabled} onClick={submit}>
          {status ? status : 'Ratify Off-Chain Activity'}
        </Button>
      </div>
    </div>
  )
}
