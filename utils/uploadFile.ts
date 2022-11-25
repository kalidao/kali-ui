import { convertIpfsHash } from './convertIpfsHash'

// General use case
export async function uploadFile(attachment: any) {
  try {
    const result = await fetch('api/upload/file', {
      method: 'POST',
      body: attachment,
    }).then((res) => res.json())
    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.error('Something wrong with upload.', e)
  }
}
