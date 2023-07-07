import { uploadFile, uploadJSON } from '@utils/ipfs'

export const createSwapDetails = async (dao: string, chainId: number, background: any, terms: any) => {
  // upload file to ipfs
  try {
    const termsHash = await uploadFile(terms)
    
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
