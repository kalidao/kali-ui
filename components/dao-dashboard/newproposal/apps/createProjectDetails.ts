import { uploadFile, uploadJSON } from '@utils/ipfs'

export const createProjectDetails = async (id: number, dao: string, chainId: number, name: string, file: any) => {
  try {
    const hash = await uploadFile(file)

    if (typeof hash == 'string') {
      const details = await uploadJSON({
        id: id,
        dao: dao,
        chainId: chainId,
        name: name,
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
