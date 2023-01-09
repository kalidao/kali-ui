import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BigNumber, ethers } from 'ethers'
import { useContract, useSigner, useContractRead, erc20ABI } from 'wagmi'
import { Stack, Input, Button, FieldSet, Tag } from '@kalidao/reality'
import FileUploader from '@components/tools/FileUpload'
import KALIDAO_ABI from '@abi/KaliDAO.json'
import PM_ABI from '@abi/KaliProjectManager.json'
import { addresses } from '@constants/addresses'
import { Warning } from '@design/elements'
import Back from '@design/proposal/Back'
import { createProposal } from '../utils'
import { ProposalProps } from '../utils/types'
import { DateInput } from '@design/DateInput'
import { getProvider } from '@utils/getProvider'
import { AddressZero } from '@ethersproject/constants'
import { fetchProject } from './utils/fetchProject'
import { prettyDate } from '@utils/prettyDate'
import { updateProjectDetails } from './updateProjectDetails'

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

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  const kaliPm = useContract({
    addressOrName: projectManagementAddress,
    contractInterface: PM_ABI,
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
  const [newBudget, setNewBudget] = useState<BigNumber>()
  const [oldBudget, setOldBudget] = useState<string>()
  const [oldDeadline, setOldDeadline] = useState<number>(0)
  const [newDeadline, setNewDeadline] = useState<number>()
  const [oldDocs, setOldDocs] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [projectId, setProjectId] = useState<number>(0)
  const [newManager, setNewManager] = useState<string>()
  const [oldManager, setOldManager] = useState<string>()
  const [isEnabled, setIsEnabled] = useState<Boolean>(false)
  const [inactiveProject, setInactiveProject] = useState<string>()

  const handleProjectId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let id = e.target.value
    setProjectId(Number(id))

    try {
      const project = await fetchProject(daoAddress, chainId, Number(id))

      // Handle project account
      if (project.account == AddressZero) {
        setIsEnabled(false)
        setInactiveProject('Inactive Project')
      } else {
        setInactiveProject('')
      }
      // Handle project reward
      if (ethers.utils.getAddress(project.token) == ethers.utils.getAddress(daoAddress)) {
        setReward('dao')
      } else {
        setReward('custom')
      }

      // Handle project manager
      setOldManager(project.manager)

      // Handle project deadline
      setOldDeadline(project.deadline)

      // Handle project budget
      const contract = new ethers.Contract(project.token, erc20ABI, provider)
      const decimals = await contract.decimals()
      const symbol = await contract.symbol()
      const budget = ethers.utils.formatUnits(project.budget, decimals)
      setCustomToken(project.token)
      setCustomTokenSymbol(symbol)
      setCustomTokenDecimals(decimals)
      setOldBudget(budget)

      // Handle project docs
      const res = await fetch(project.docs)
      const data = await res.json()
      setOldDocs(data.file)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    let _deadline = e.target.value

    if (Date.parse(_deadline) < Date.now()) {
      setWarning('Invalid deadline. Please pick another date and time.')
    } else {
      setNewDeadline(Date.parse(_deadline) / 1000)
    }
  }

  const handleBudget = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let _budget = e.target.value
    let daoBalance

    if (Number(_budget) == 0) {
      setWarning('Budget is required.')
    }

    if (reward == 'dao') {
      const __budget = _budget ? ethers.utils.parseEther(_budget) : ethers.utils.parseEther('0.0')
      setNewBudget(__budget)
    }

    if (reward == 'custom') {
      if (Number(_budget) > Number(daoBalance) || Number(_budget) > Number(daoTokenBalance)) {
        setWarning('Budget exceeds existing DAO balance.')
      } else {
        setWarning('')
        const __budget = ethers.utils.parseUnits(_budget, customTokenDecimals)
        setNewBudget(__budget)
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

    console.log(projectId, newManager, newBudget, newDeadline, file)
    if (!newManager || !newBudget || !newDeadline) {
      setWarning('All fields are required.')
      return
    }

    let _reward
    let _token
    let _budget

    if (reward === 'dao') {
      _reward = 0
      _token = daoAddress
      _budget = ethers.utils.formatEther(newBudget ? newBudget : BigNumber.from(0))
    } else if (reward === 'custom') {
      _reward = 1
      _token = customToken
      _budget = ethers.utils.formatUnits(newBudget ? newBudget : BigNumber.from(0), customTokenDecimals)
    } else {
      setWarning('Invalid reward.')
    }

    setStatus('Uploading documents to IPFS...')
    let detailsHash
    detailsHash = await updateProjectDetails(
      projectId,
      newManager ? newManager : '',
      Number(_budget),
      newDeadline ? newDeadline.toString() : '',
      file,
    )

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
        [projectId, 1, newManager, _reward, _token, newBudget, newDeadline, detailsHash],
      )
      console.log(projectId, 1, newManager, _reward, _token, newBudget, newDeadline, detailsHash)
    } catch (e) {
      setWarning('Error setting the project management proposal.')
      console.log(e)
      return
    }

    console.log('Proposal Params - ', 9, docs, [projectManagementAddress], [0], [payload])

    setStatus('Creating proposal...')
    try {
      setWarning('')
      const tx = await kalidao.propose(
        9, // EXTENSION prop
        docs,
        [projectManagementAddress],
        [1],
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
      legend="Update a Project"
      description="Add a project, set a budget, and assign a manager to distribute ETH and ERC20 tokens, including your KaliDAO tokens."
    >
      <Input
        label="Project ID"
        description=""
        name="id"
        type="number"
        min={0}
        error={inactiveProject}
        onChange={handleProjectId}
      />
      {/* <Stack align="center" justify={'center'}>
        <ProjectOverview dao={daoAddress} chaindId={chainId} projectId={projectId} />
      </Stack> */}
      <Input
        label="Manager"
        labelSecondary={<Tag>Current Manager: {oldManager ? oldManager : 'N/A'} </Tag>}
        description=""
        name="manager"
        type="text"
        placeholder={AddressZero}
        onChange={(e) => setNewManager(e.target.value)}
      />
      <Input
        label="Reward"
        description=""
        name="type"
        disabled={true}
        placeholder={reward == 'dao' ? 'DAO Token' : 'Custom Token'}
      />
      <Input
        label="Budget"
        labelSecondary={
          <Tag>
            Current Project Budget: {oldBudget ? oldBudget : ' '} ${customTokenSymbol ? customTokenSymbol : 'Ξ'}
          </Tag>
        }
        description="Specify a budget for this project."
        name="personalLimit"
        type="number"
        placeholder="0.0"
        min={0}
        onChange={handleBudget}
      />

      <DateInput
        label="Project Deadline"
        onChange={handleDeadline}
        description=""
        labelSecondary={<Tag>Current Deadline: {prettyDate(new Date(oldDeadline * 1000))}</Tag>}
      />

      <FileUploader
        label="Document"
        description=""
        setFile={setFile}
        labelSecondary={
          oldDocs ? (
            <Tag>
              Current Document:{' '}
              <a href={oldDocs} target="_blank" rel="noopener noreferrer">
                {oldDocs ? 'Link' : 'N/A'}
              </a>
            </Tag>
          ) : (
            <Tag>Current Document: N/A</Tag>
          )
        }
      />
      {warning && <Warning warning={warning} />}
      <Stack align="center" justify={'space-between'} direction="horizontal">
        <Back onClick={() => setProposal?.('appsMenu')} />
        <Button
          width={'full'}
          // disabled={!isEnabled}
          onClick={submit}
        >
          {status ? status : 'Update Project'}
        </Button>
      </Stack>
    </FieldSet>
  )
}
