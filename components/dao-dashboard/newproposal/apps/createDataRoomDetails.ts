import { uploadFile, uploadJSON } from '@utils/ipfs'
import { convertIpfsHash } from '@utils/convertIpfsHash'

export const createDataRoomDetails = async (dao: string, chainId: number, tags: string[], docs: any) => {
  // upload file to ipfs
  try {
    const termsHash = await uploadFile(docs)
    console.log('termsHash', termsHash)
    if (typeof termsHash == 'string') {
      const details = await uploadJSON({
        dao: dao,
        chainId: chainId,
        tags: tags,
        terms: termsHash,
      })

      return details
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}
