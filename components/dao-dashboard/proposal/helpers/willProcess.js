import { fetchProposal } from './fetchProposal'

export const willProcess = async (chainId, dao, id) => {
  try {
    const proposal = await fetchProposal(chainId, dao, id)
    if (Number(proposal['prevProposal'].toString()) === 0) {
      return id
    } else {
      await willProcess(chainId, dao, Number(proposal['prevProposal'].toString()))
    }
  } catch (e) {
    console.log(e)
  }
}
