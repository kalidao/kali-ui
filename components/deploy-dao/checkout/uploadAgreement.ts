import { convertIpfsHash } from "@utils/convertIpfsHash"

// General use case
export async function uploadAgreement(attachment: any) {
  try {
    const result = await fetch('api/file', {
      method: 'POST',
      body: attachment,
    }).then((res) => res.json())
    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.error('Something wrong with upload.', e)
  }
}