import { uploadFile, uploadJSON } from '@utils/ipfs'
import { convertIpfsHash } from '@utils/convertIpfsHash'

export const createProjectDetails = async (
  dao: string,
  chainId: number,
  name: string,
  manager: string,
  reward: string,
  budget: number,
  deadline: string,
  file: any,
) => {
  // upload file to ipfs
  try {
    const hash = await uploadFile(file)
    console.log('hash', hash)
    if (typeof hash == 'string') {
      const details = await uploadJSON({
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
