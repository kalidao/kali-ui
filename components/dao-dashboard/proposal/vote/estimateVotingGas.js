import { ethers } from 'ethers'
import DAO_ABI from '../../../abi/KaliDAO.json'
// TODO
export const estimateVotingGas = async (chainId, address, serial, approval) => {
  const provider = new ethers.providers.InfuraProvider(Number(chainId), process.env.NEXT_PUBLIC_INFURA_ID)
  const dao = new ethers.Contract(address, DAO_ABI, provider)
  const estimate = await dao.estimateGas.vote(serial, approval)

  return estimate
}
