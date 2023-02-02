import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { Stack, Text, Box, Button, Input, IconLink } from '@kalidao/reality'
import { useContract, useSigner } from 'wagmi'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import { addresses } from '@constants/addresses'
import * as styles from '../../../../components/home/styles.css'
import { fetchDaoProject } from '@components/dao-dashboard/newproposal/apps/utils/fetchDaoProjects'
import { prettyDate } from '@utils/prettyDate'
import { ethers } from 'ethers'
import { truncateAddress } from '@utils/truncateAddress'
import { Warning } from '@design/elements'
import PM_ABI from '@abi/KaliProjectManagement.json'

interface Project {
  id: number
  account: string
  budget: string
  deadline: Date
  distributed: string
  manager: string
  reward: string
  status: string
  token: string
  tokenDecimals: number
  name: string
  file: URL
}

const Projects: NextPage = () => {
  const router = useRouter()
  const daoAddress = router.query.dao ? (router.query.dao as string) : AddressZero
  const chainId = Number(router.query.chainId)
  const pmAddress = chainId ? addresses[chainId]['extensions']['project'] : AddressZero

  const [projects, setProjects] = useState<Project[]>([])
  const [id, setId] = useState<number>(0)
  const [tokenDecimals, setTokenDecimals] = useState(0)
  const [contributor, setContributor] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [warning, setWarning] = useState<string>()
  const [status, setStatus] = useState<string>()

  const { data: signer } = useSigner()

  const kaliPm = useContract({
    address: pmAddress,
    abi: PM_ABI,
    signerOrProvider: signer,
  })

  const handleId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const _id = Number(e.target.value)
    if (projects[_id - 1]) {
      setTokenDecimals(projects[_id - 1].tokenDecimals)
      setId(_id)
      setWarning('')
    } else {
      setWarning('No Project found.')
    }
  }

  const submit = async () => {
    setStatus('Processing...')
    console.log(id, contributor, amount)
    if (!contributor || !amount) {
      setWarning('All fields are required.')
      return
    }

    setWarning('')
    setStatus('Encoding Reward Data...')
    let _amount
    _amount = ethers.utils.parseUnits(amount, tokenDecimals)
    console.log(_amount)
    let payload
    try {
      const abiCoder = ethers.utils.defaultAbiCoder
      payload = abiCoder.encode(['uint256', 'address', 'uint256'], [id, contributor, _amount])
      console.log(id, contributor, amount, payload)
    } catch (e) {
      setWarning('Error gathering project data.')
      console.log(e)
      return
    }

    setStatus('Rewarding Contributor...')
    try {
      const tx = await kaliPm?.callExtension([payload])
      console.log('tx', tx)
      setStatus('Contributor Rewarded.')
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    const getProjects = async () => {
      const _projects = await fetchDaoProject(daoAddress, chainId)

      setProjects(_projects)
    }

    getProjects()
  }, [])

  return (
    <Layout title={`Projects`} content="Manage DAO projects.">
      <Stack>
        <Box
          width="viewWidth"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="3"
          padding="3"
        >
          <Box width={'1/3'}>
            <Stack align="center">
              <Text variant="extraLarge">Drop</Text>
              <Input label="Project ID" name="id" type="number" placeholder={'0'} onChange={handleId} />
              <Input
                label="Contributor"
                name="contributor"
                type="text"
                onChange={(e) => setContributor(e.target.value)}
              />
              <Input label="Reward Amount" name="amount" type="text" onChange={(e) => setAmount(e.target.value)} />
              {warning && <Warning warning={warning} />}
              <Button onClick={submit}>{status ? status : 'Submit'}</Button>
            </Stack>
          </Box>
          <Stack direction={'horizontal'} justify={'flex-start'} wrap>
            {projects?.map((project, index) => {
              return (
                <Box
                  key={index}
                  color={'red'}
                  as="button"
                  padding="6"
                  width="96"
                  backgroundColor="red"
                  className={styles.card}
                >
                  <Stack>
                    <Text>{project.name}</Text>
                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Project ID:</Text>
                      <Text>#{project.id}</Text>
                    </Stack>

                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Status:</Text>
                      <Text>{project.status}</Text>
                    </Stack>

                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Deadline:</Text>
                      <Text>{prettyDate(project.deadline)}</Text>
                    </Stack>

                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Manager:</Text>
                      <Text>
                        <a
                          href={addresses[chainId]['blockExplorer'] + '/address/' + project.manager}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {project.manager.slice(-4) == '.eth' ? project.manager : truncateAddress(project.manager)}
                        </a>
                      </Text>
                    </Stack>

                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Budget:</Text>
                      <Text>
                        {project.budget} {project.reward}
                      </Text>
                    </Stack>

                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Distributed:</Text>
                      <Text>
                        {project.distributed} {project.reward}
                      </Text>
                    </Stack>

                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Reward Token:</Text>
                      <Text>
                        <a
                          href={addresses[chainId]['blockExplorer'] + '/address/' + project.token}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {truncateAddress(project.token)}
                        </a>
                      </Text>
                    </Stack>

                    <Stack direction="horizontal" align="center" justify={'space-between'}>
                      <Text>Detail:</Text>
                      <Text>
                        <a href={project.file.toString()} target="_blank" rel="noreferrer">
                          <IconLink></IconLink>
                        </a>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              )
            })}
          </Stack>
        </Box>
      </Stack>
    </Layout>
  )
}

export default Projects
