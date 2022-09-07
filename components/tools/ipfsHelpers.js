import fleek from '@fleekhq/fleek-storage-js'
import fleekStorage from '@fleekhq/fleek-storage-js'

// General use case
export async function uploadIpfs(dao, content, attachment) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
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
    console.log('Something wrong with Fleek upload.')
  }
}

// Upload incorporation docs
export async function ipfsIncorporationDoc(name, summoner, doc) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: name + "'s Incoporation Document as summoned by " + summoner,
    data: doc,
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

// Upload crowdsale data
export async function ipfsCrowdsaleData(dao, chainId, background, termsHash, receiptHash, receiptMessage) {
  const obj = {
    contract: 'KaliV1',
    dao: dao,
    crowdsale: 'KaliDAOcrowdsaleV2',
    chainId: chainId,
    background: background,
    terms: termsHash,
    receipt: receiptHash,
    receiptMessage: receiptMessage,
  }

  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: 'DAO (' + dao + ")'s Crowdsale Data",
    data: JSON.stringify(obj, null, 2),
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

// Upload crowdsale terms
export async function ipfsCrowdsaleTerms(dao, terms) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: 'DAO (' + dao + ")'s Crowdsale Terms",
    data: terms,
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

// Upload crowdsale receipt
export async function ipfsCrowdsaleReceipt(dao, receipt) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: 'DAO (' + dao + ")'s Crowdsale Receipt",
    data: receipt,
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

// Fetch crowdsale data
export async function fetchCrowdsaleDataHash(dao) {
  let hash
  try {
    const hash_ = await fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
      key: 'DAO (' + dao + ")'s Crowdsale Data",
      getOptions: ['hash'],
    })
    console.log(hash_)
    if (hash_.hash) {
      hash = hash_.hash
    } else {
      hash = 'none'
    }
  } catch (e) {
    console.log('Error retrieving crowdsale data.')
  }
  return hash
}

// Fetch crowdsale terms
export async function fetchCrowdsaleTermsHash(dao) {
  let hash
  try {
    const hash_ = await fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
      key: 'DAO (' + dao + ")'s Crowdsale Terms",
      getOptions: ['hash'],
    })
    if (hash_.hash) {
      hash = hash_.hash
    } else {
      hash = 'none'
    }
  } catch (e) {
    console.log('Error retrieving terms.')
  }
  return hash
}

// Fetch crowdsale receipt
export async function fetchCrowdsaleReceiptHash(dao) {
  let hash
  try {
    const hash_ = await fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
      key: 'DAO (' + dao + ")'s Crowdsale Receipt",
      getOptions: ['hash'],
    })
    if (hash_.hash) {
      hash = hash_.hash
    } else {
      hash = 'none'
    }
  } catch (e) {
    console.log('Error retrieving terms.')
  }
  return hash
}
