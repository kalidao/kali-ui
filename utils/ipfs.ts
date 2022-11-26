import { convertIpfsHash } from './convertIpfsHash'

export async function uploadFile(attachment: any) {
  try {
    const result = await fetch('api/file', {
      method: 'POST',
      body: attachment,
    }).then((res) => res.json())
    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.error('Something wrong with upload.', e)
    return new Error('Something wrong with upload.')
  }
}

// General use case
export async function uploadBlob(attachment: any) {
  try {
    const result = await fetch('api/blob', {
      method: 'POST',
      body: attachment,
    }).then((res) => res.json())
    const url = convertIpfsHash(result.IpfsHash)
    return url
  } catch (e) {
    console.error('Something wrong with upload.', e)
    return new Error('Something wrong with upload.')
  }
}

export async function uploadJSON(obj: any) {
  try {
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
    console.error(e)
    return new Error('Something wrong with upload.')
  }
}
