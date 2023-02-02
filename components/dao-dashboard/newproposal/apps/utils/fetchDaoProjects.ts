import { BigNumber, ethers } from 'ethers'
import { addresses } from '@constants/addresses'
import PM_ABI from '@abi/KaliProjectManagement.json'
import { getProvider } from '@utils/getProvider'
import { erc20ABI } from 'wagmi'
import { fetchEnsFromAddress } from '@utils/fetchEnsFromAddress'

interface Project {
  id: number
  account: string
  budget: string
  deadline: Date
  distributed: string
  manager: string
  managerAddress: string
  reward: string
  status: string
  token: string
  tokenDecimals: number
  name: string
  file: URL
}

export const fetchDaoProject = async (dao: string, chainId: number) => {
  const provider = getProvider(chainId)

  const projectManagementAddress = addresses[chainId]['extensions']['project']
  let projects: Array<Project> = []
  let managers: Array<string> = []

  const kaliPm = new ethers.Contract(projectManagementAddress, PM_ABI, provider)
  const _projectId: BigNumber = await kaliPm.projectId()
  const projectId = Number(ethers.utils.formatUnits(_projectId, 0))

  for (let i = 0; i <= projectId; i++) {
    const p = await kaliPm.projects(i)
    if (p.account == ethers.utils.getAddress(dao)) {
      try {
        // Check reward token decimals
        const instance = new ethers.Contract(p.token, erc20ABI, provider)
        const decimals = await instance.decimals()
        const symbol = await instance.symbol()

        const managerEns = (await fetchEnsFromAddress(p.manager, chainId)) as string

        const response = await fetch(p.docs)
        const responseJson = await response.json()

        projects.push({
          id: i,
          account: p.account,
          budget: decimals < 18 ? ethers.utils.formatUnits(p.budget, decimals) : ethers.utils.formatEther(p.budget),
          deadline: new Date(p.deadline * 1000),
          distributed:
            decimals < 18 ? ethers.utils.formatUnits(p.distributed, decimals) : ethers.utils.formatEther(p.distributed),
          manager: managerEns,
          managerAddress: p.manager,
          reward: p.reward == 0 ? 'DAO Tokens' : symbol,
          status: p.status == 0 ? 'Inactive' : 'Active',
          token: p.token,
          tokenDecimals: decimals,
          name: responseJson.name,
          file: responseJson.file,
        })

        managers.push(p.manager)
      } catch (e) {
        console.log(e, p.docs)
      }
    }
  }
  console.log(projects)

  return { projects, managers }
}
