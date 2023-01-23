import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BigNumber, ethers } from 'ethers'
import { useContract, useSigner, useContractRead, erc20ABI } from 'wagmi'
import { Stack, Input, Button, FieldSet, Tag } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
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
import { createProjectDetails } from './createProjectDetails'

export default function SetProject({ setProposal, title, content }: ProposalProps) {
  const router = useRouter()
  const daoAddress = router.query.dao as string
  const chainId = Number(router.query.chainId)
  const provider = getProvider(chainId)

  const { data: signer } = useSigner()
  const projectManagementAddress = addresses[chainId]['extensions']['project']

  const { data: kalidaoToken } = useContractRead({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    functionName: 'symbol',
    chainId: Number(chainId),
  })

  const { data: isExtension } = useContractRead({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    functionName: 'extensions',
    chainId: Number(chainId),
    args: [projectManagementAddress],
  })

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [file, setFile] = useState<File>()
  const [warning, setWarning] = useState<string>()
  const [reward, setReward] = useState('select')
  const [customToken, setCustomToken] = useState<string>('')
  const [customTokenSymbol, setCustomTokenSymbol] = useState<string>('')
  const [customTokenDecimals, setCustomTokenDecimals] = useState(0)
  const [daoTokenBalance, setDaoTokenBalance] = useState<string>()
  const [budget, setBudget] = useState<BigNumber>()
  const [deadline, setDeadline] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [name, setName] = useState<string>()
  const [manager, setManager] = useState<string>()

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

  const handleReward = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selection = e.target.value
    let daoBalanceRaw
    let daoBalance

    if (selection == 'eth') {
      daoBalanceRaw = await provider.getBalance(daoAddress)
      daoBalance = ethers.utils.formatEther(daoBalanceRaw)

      setWarning('')
      setDaoTokenBalance(daoBalance)
      setCustomTokenSymbol('Ξ')
    }

    if (selection == 'dao') {
      const daoToken = kalidaoToken ? kalidaoToken?.toString() : ''

      setWarning('')
      setDaoTokenBalance('Unrestricted')
      setCustomTokenSymbol(' ')
    }

    if (selection == 'custom') {
      setWarning('')
      setDaoTokenBalance('')
      setCustomTokenSymbol('')
    }

    setReward(selection)
  }

  const handleCustomToken = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const contract = new ethers.Contract(e.target.value, erc20ABI, provider)
    const decimals = await contract.decimals()
    const symbol = await contract.symbol()
    const daoBalanceRaw = await contract.balanceOf(daoAddress)
    let daoBalance

    if (decimals < 18) {
      daoBalance = ethers.utils.formatUnits(daoBalanceRaw, decimals)
    } else {
      daoBalance = ethers.utils.formatEther(daoBalanceRaw)
    }

    console.log(daoBalance)
    setCustomToken(e.target.value)
    setCustomTokenSymbol(symbol)
    setCustomTokenDecimals(decimals)
    setDaoTokenBalance(daoBalance)
  }

  const handleBudget = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let _budget = e.target.value
    console.log(_budget, reward)
    let daoBalanceRaw
    let daoBalance

    if (Number(_budget) == 0) {
      setWarning('Budget is required.')
    }

    if (reward == 'dao') {
      const __budget = _budget ? ethers.utils.parseEther(_budget) : ethers.utils.parseEther('0.0')
      setBudget(__budget)
    }

    if (reward == 'custom') {
      if (Number(_budget) > Number(daoBalance) || Number(_budget) > Number(daoTokenBalance)) {
        setWarning('Budget exceeds existing DAO balance.')
        return
      } else {
        setWarning('')
        const __budget = ethers.utils.parseUnits(_budget, customTokenDecimals)
        console.log(__budget, _budget, customTokenDecimals)
        setBudget(__budget)
      }
    }
  }

  const submit = async () => {
    // Validate form inputs
    setStatus('Creating proposal...')
    if (!signer) {
      setWarning('Please connect your wallet.')
      return
    }

    console.log(name, manager, reward, budget, deadline, file)
    if (!name || !manager || reward === 'select' || !budget || !deadline || !file) {
      setWarning('All fields are required.')
      return
    }

    if (reward === 'custom' && customToken == '') {
      setWarning('Custom token address is required.')
      return
    }

    let _reward
    let _token
    let _budget

    if (reward === 'dao') {
      _reward = 0
      _token = daoAddress
      _budget = ethers.utils.formatEther(budget)
    } else if (reward === 'custom') {
      _reward = 1
      _token = customToken
      _budget = ethers.utils.formatUnits(budget, customTokenDecimals)
    } else {
      setWarning('Invalid reward.')
    }

    // Upload docs to IFPS
    setStatus('Uploading documents to IPFS...')
    let detailsHash
    detailsHash = await createProjectDetails(0, daoAddress, chainId, name, file)

    if (detailsHash == '') {
      setWarning('Error uploading documents.')
      setStatus('')
      return
    }

    // Upload proposal metadata
    setStatus('Creating proposal metadata...')
    let docs
    try {
      docs = await createProposal(daoAddress, chainId, 9, title, content)
    } catch (e) {
      console.error(e)
      return
    }

    setStatus('Encoding project management details...')
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(
        ['uint256', 'uint8', 'address', 'uint8', 'address', 'uint256', 'uint40', 'string'],
        [0, 1, manager, _reward, _token, budget, deadline, detailsHash],
      )
      console.log(0, 1, manager, _reward, _token, budget, deadline, detailsHash)
    } catch (e) {
      setWarning('Error setting the project management proposal.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [projectManagementAddress], [isExtension ? 0 : 1], [payload])

    setStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await kalidao.propose(
        9, // EXTENSION prop
        docs,
        [projectManagementAddress],
        [isExtension ? 0 : 1],
        [payload],
      )
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
    setStatus('Proposed.')
  }

  useEffect(() => {
    const checkDaoEthBalance = async () => {
      const balance = await provider.getBalance(daoAddress)
      let daoBalance = ethers.utils.formatEther(balance)
      console.log(daoBalance, daoTokenBalance)
      setDaoTokenBalance(daoBalance)
    }

    checkDaoEthBalance()
  }, [])

  return (
    <FieldSet
      legend="Add a Project"
      description="Add a project, set a budget, and assign a manager to distribute ETH and ERC20 tokens, including your KaliDAO tokens."
    >
      <Input label="Project Name" description="" name="name" type="text" onChange={(e) => setName(e.target.value)} />
      <Input
        label="Manager"
        description="Assign a manager to distribute rewards directly to contributors."
        name="manager"
        type="text"
        placeholder={AddressZero}
        onChange={(e) => setManager(e.target.value)}
      />
      <Select
        label="Reward"
        description="Pick a reward type."
        name="type"
        onChange={handleReward}
        options={[
          { value: 'select', label: 'Select' },
          // { value: 'eth', label: 'Ether' },
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
            Current DAO Balance: {daoTokenBalance ? daoTokenBalance : ' '} {customTokenSymbol ? customTokenSymbol : 'Ξ'}
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
        labelSecondary=""
        description="Upload a document describing this new project. Any document uploaded will live on IPFS."
        setFile={setFile}
      />
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button width={'full'} onClick={submit}>
          {status ? status : 'Propose Project'}
        </Button>
      </Stack>
    </FieldSet>
  )
}
