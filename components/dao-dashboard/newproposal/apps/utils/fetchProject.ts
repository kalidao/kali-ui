import { ethers } from 'ethers'
import { addresses } from '@constants/addresses'
import PM_ABI from '@abi/KaliProjectManagement.json'
import { getProvider } from '@utils/getProvider'

export const fetchProject = async (chainId: number, projectId: number) => {
  const provider = getProvider(chainId)
  const projectManagementAddress = addresses[chainId]['extensions']['project']

  const _kaliPm = new ethers.Contract(projectManagementAddress, PM_ABI, provider)
  const project = await _kaliPm.projects(projectId)

  return project
}
