import { convertIpfsHash } from '@utils/convertIpfsHash'

// createProposal and upload
export const createProposal = async (
  dao: string,
  chainId: number,
  type: number,
  title: string,
  description: { [key: string]: any } | undefined,
) => {
  try {
    const obj = {
      contract: 'KaliV1',
      dao: dao,
      chainId: chainId,
      type: type,
      title: title,
      description: description,
    }

    const result = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify(obj),
    }).then((res) => res.json())

    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.log(e)
    return ''
  }
}
