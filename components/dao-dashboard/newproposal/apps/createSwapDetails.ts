import { uploadFile, uploadJSON } from '@utils/ipfs'
import { convertIpfsHash } from '@utils/convertIpfsHash'

export const createSwapDetails = async (dao: string, chainId: number, background: any, terms: any) => {
  // upload file to ipfs
  try {
    const termsHash = await uploadFile(terms)
    console.log('termsHash', termsHash)
    if (typeof termsHash == 'string') {
      const details = await uploadJSON({
        dao: dao,
        chainId: chainId,
        background: background,
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
