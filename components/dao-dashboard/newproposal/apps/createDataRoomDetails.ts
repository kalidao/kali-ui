import { uploadFile, uploadJSON } from '@utils/ipfs'
import { convertIpfsHash } from '@utils/convertIpfsHash'

export const createDataRoomDetails = async (dao: string, chainId: number, tags: string[], docs: any) => {
  // upload file to ipfs
  try {
    const docsHash = await uploadFile(docs)
    console.log('docsHash', docsHash)
    if (typeof docsHash == 'string') {
      const details = await uploadJSON({
        dao: dao,
        chainId: chainId,
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
