import fleek from '@fleekhq/fleek-storage-js'

// createProposal and upload
export async function createProposal(dao, chainId, type, title, description) {
  const obj = {
    contract: 'KaliV1',
    dao: dao,
    chainId: chainId,
    type: type,
    title: title,
    description: description,
  }

  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: dao + 'proposal' + type,
    data: JSON.stringify(obj, null, 2),
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + '% done')
    },
  }

  try {
    const result = await fleek.upload(input)
    return 'prop://' + result.hash
  } catch (e) {
    console.log(e)
  }
}
