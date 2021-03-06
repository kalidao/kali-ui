import fleek from '@fleekhq/fleek-storage-js'

// helper functions to assemble final `proposals` and `dao` objects
// votingPeriod
export const calculateVotingPeriod = (period, unit) => {
  let seconds
  if (unit == 0) {
    seconds = period * 60 * 60 * 24
  } else if (unit == 1) {
    seconds = period * 60 * 60
  } else {
    seconds = period * 60
  }
  console.log(seconds)
  return seconds
}

// helper function to upload files to IPFS via Fleek
export async function uploadIpfs(dao, content, attachment) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket',
    key: 'DAO (' + dao + ")'s " + content + ' is attached with ' + attachment.name,
    data: attachment,
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + '% done')
    },
  }

  try {
    const result = await fleek.upload(input)
    console.log('Image hash from Fleek: ' + result.hash)
    return result.hash
  } catch (e) {
    console.log(e)
  }
}
