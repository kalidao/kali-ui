import { uploadFile, uploadJSON } from '@utils/ipfs'

export const createProjectDetails = async (
  id: number,
  dao: string,
  chainId: number,
  name: string,
  manager: string,
  reward: string,
  budget: number,
  deadline: string,
  file: any,
) => {
  try {
    const hash = await uploadFile(file)

    if (typeof hash == 'string') {
      const details = await uploadJSON({
        id: id,
        dao: dao,
        chainId: chainId,
        name: name,
        manager: manager,
        reward: reward,
        budget: budget,
        deadline: deadline,
        file: hash,
      })
      return details
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}
