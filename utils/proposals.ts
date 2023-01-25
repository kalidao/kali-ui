import { getProvider } from './getProvider'
import DAO_ABI from '@abi/KaliDAO.json'
import { ethers } from 'ethers'

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
