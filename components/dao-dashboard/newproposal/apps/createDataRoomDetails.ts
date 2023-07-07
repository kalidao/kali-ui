import { uploadFile, uploadJSON } from '@utils/ipfs'
import { convertIpfsHash } from '@utils/convertIpfsHash'

export const createDataRoomDetails = async (dao: string, chainId: number, name: string, tags: string[], docs: any) => {
  // upload file to ipfs
  try {
    const docsHash = await uploadFile(docs)
    
    if (typeof docsHash == 'string') {
      const details = await uploadJSON({
        dao: dao,
        chainId: chainId,
        name: name,
        tags: tags,
        docs: docsHash,
      })

      return details
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}
