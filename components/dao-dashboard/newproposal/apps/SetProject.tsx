import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useContract, useSigner, useContractRead, erc20ABI } from 'wagmi'
import {
  Stack,
  Input,
  Box,
  Text,
  Button,
  FieldSet,
  FileInput,
  Textarea,
  IconClose,
  Checkbox,
  IconUserSolid,
  Tag,
} from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import MANAGER_ABI from '@abi/KaliProjectManager.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils'
import { ProposalProps } from '../utils/types'
// import { createDataRoomDetails } from './createDataRoomDetails'
import { fetchEnsAddress } from '@utils/fetchEnsAddress'
import { Select } from '@design/Select'
import { DateInput } from '@design/DateInput'
import { getProvider } from '@utils/getProvider'
import { AddressZero } from '@ethersproject/constants'

export default function SetProject({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const provider = getProvider(chainId)

  const { data: signer } = useSigner()
  const dataRoomAddress = addresses[chainId]['extensions']['dataRoom']

  const { data: kalidaoToken } = useContractRead({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [record, setRecords] = useState<File>()
  const [warning, setWarning] = useState<string>()
  const [isEnabled, setIsEnabled] = useState(false)
  const [reward, setReward] = useState('select')
  const [customToken, setCustomToken] = useState<string>('')
  const [customTokenSymbol, setCustomTokenSymbol] = useState<string>('')
  const [customTokenDecimals, setCustomTokenDecimals] = useState(0)
  const [customTokenDaoBalance, setCustomTokenDaoBalance] = useState(0.0)
  const [budget, setBudget] = useState(0)
  const [maxBudget, setMaxBudget] = useState(0)
  const [deadline, setDeadline] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [name, setName] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [users, setUsers] = useState<string[]>([])

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value
    let _tags: Array<string> = []
    _tags = raw.split(', ')
    setTags(_tags)
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

  const handleDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let _deadline = e.target.value

    if (Date.parse(_deadline) < Date.now()) {
      setWarning('Invalid deadline. Please pick another date and time.')
    } else {
      _deadline = (Date.parse(_deadline) / 1000).toString()
      setDeadline(_deadline)
    }
  }

  const handleCustomToken = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const contract = new ethers.Contract(e.target.value, erc20ABI, provider)
    const decimals = await contract.decimals()
    const symbol = await contract.symbol()
    const daoBalanceRaw = await contract.balanceOf(daoAddress)
    let daoBalance

    if (customTokenDecimals < 18) {
      daoBalance = ethers.utils.formatUnits(daoBalanceRaw, customTokenDecimals)
    } else {
      daoBalance = ethers.utils.formatEther(daoBalanceRaw)
    }

    console.log(daoBalance)
    setCustomToken(e.target.value)
    setCustomTokenSymbol(symbol)
    setCustomTokenDecimals(decimals)
    setCustomTokenDaoBalance(parseFloat(daoBalance))
  }

  const handleBudget = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const _budget = Number(e.target.value)

    let daoBalanceRaw
    let daoBalance

    // Check if DAO has enough Ether to cover budget
    // Custom token balance is checked in handleCustomToken()
    if (reward == 'eth') {
      daoBalanceRaw = await provider.getBalance(daoAddress)
      daoBalance = ethers.utils.formatEther(daoBalanceRaw)
      setMaxBudget(Number(daoBalance))
    }

    console.log(daoBalance)
    if (_budget > Number(daoBalance) || _budget > customTokenDaoBalance) {
      setWarning('Budget exceeds existing DAO balance.')
    } else {
      setWarning('')
    }
  }

  const submit = async () => {
    setStatus('Creating proposal...')
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    setStatus('Uploading document to IPFS...')
    let recordHash
    // recordHash = await createDataRoomDetails(daoAddress, chainId, name, tags, record)
    console.log(name, tags, record)

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

    let iface = new ethers.utils.Interface(MANAGER_ABI)
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
      legend="Add a Project"
      description="Add a project, set a budget, and assign a manager to distribute ETH and ERC20 tokens, including your KaliDAO tokens."
    >
      <Input label="Project Name" description="" name="tags" type="text" onChange={(e) => setName(e.target.value)} />
      <Input
        label="Manager"
        description="Assign a manager to distribute rewards directly to contributors."
        name="tags"
        type="text"
        placeholder={AddressZero}
        onChange={handleTags}
      />
      <Select
        label="Reward"
        description="Pick a reward type."
        name="type"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setReward(e.target.value)}
        options={[
          { value: 'select', label: 'Select' },
          { value: 'eth', label: 'Ether' },
          { value: 'dao', label: `DAO token ($${kalidaoToken})` },
          { value: 'custom', label: 'ERC20' },
        ]}
      />
      {reward === 'custom' && (
        <Input label="Custom Token Contract Address" name="tokenAddress" type="text" onChange={handleCustomToken} />
      )}
      <Input
        label="Budget"
        labelSecondary={
          <Tag>
            Current DAO Balance: {customTokenDaoBalance ? customTokenDaoBalance : maxBudget} {customTokenSymbol}
          </Tag>
        }
        description="Specify a budget for this project."
        name="personalLimit"
        type="number"
        onChange={handleBudget}
      />

      <DateInput
        label="Project Deadline"
        description="Specify a time to which this Swap ends"
        onChange={handleDeadline}
      />

      <FileUploader
        label="Document"
        description="Upload a document describing this new project. Any document uploaded will live on IPFS."
        setFile={setRecords}
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
