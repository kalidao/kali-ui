import { ethers } from 'ethers'
import { addresses } from '@constants/addresses'
import PM_ABI from '@abi/KaliProjectManager.json'
import { getProvider } from '@utils/getProvider'

export const fetchProject = async (dao: string, chainId: number, projectId: number) => {
  const provider = getProvider(chainId)
  const projectManagementAddress = addresses[chainId]['extensions']['project']

  const _kaliPm = new ethers.Contract(projectManagementAddress, PM_ABI, provider)
  const project = await _kaliPm.projects(projectId)

  return project
}
