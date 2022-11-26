
import { getProvider } from './getProvider'
import DAO_ABI from '@abi/KaliDAO.json'
import { ethers, BigNumber } from "ethers"

export const isURL = (url: string) => {
  let pattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // validate fragment locator
  return !!pattern.test(url)
}

export const isProp = (prop: string) => {
  let pattern = new RegExp(
    '^(prop?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ) // validate fragment locator
  return !!pattern.test(prop)
}

// 
export const calculateParticipation = async (dao: string, chainId: number, votes: BigNumber) => {
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, DAO_ABI, provider)
    const quorum = await contract.quorum() // 30
    const totalSupply = await contract.totalSupply() // 13 

    const q = BigNumber.from(quorum)
    const required = totalSupply.mul(q).div(BigNumber.from(100))
    const participation = required < votes ? 100 : votes.mul(BigNumber.from(100)).div(required)
   

    return Number(participation) > 100 ? 100 : Number(participation)
  } catch (e) {
    console.error(e)
    return 0
  }
}

export const calculateApproval = async (dao: string, chainId: number, proposalType: number) => {
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, DAO_ABI, provider)
    // const totalSupply = await contract.totalSupply() // 13
    // const supermajority = await contract.supermajority() // 60
    const proposalVoteType = await contract.proposalVoteTypes(proposalType)

    console.log('proposal', 0, proposalVoteType)
    return 100
  } catch (e) {
    console.error(e)
    return 0
  } 
}

export const getProposalStatus = (dao: string, chainId: number, proposalId: number) => {
  try {
    const provider = getProvider(chainId)
    const contract = new ethers.Contract(dao, DAO_ABI, provider)
    return contract.proposalStatus(proposalId)
  } catch (e) {
    console.error(e)
    return new Error('Error getting proposal status')
  }
}
  