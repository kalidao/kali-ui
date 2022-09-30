import { convertIpfsHash } from '@utils/convertIpfsHash'

// createProposal and upload
const createProposal = async (
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

    const result = await fetch('api/json', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(obj),
    }).then((res) => res.json())

    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.log(e)
    return ''
  }
}

export default createProposal
