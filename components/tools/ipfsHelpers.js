import fleek from '@fleekhq/fleek-storage-js'
import fleekStorage from '@fleekhq/fleek-storage-js'
import { ethers } from 'ethers'

// ----- Pre-DAO Deployment -----

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

// Upload crowdsale terms
export async function ipfsCrowdsaleTerms(name, summoner, terms) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: name + "'s Crowdsale Terms as prepared by " + summoner.toLowerCase(),
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

// ----- Post-DAO Deployment -----

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

export async function fetchCrowdsaleTermsHash(name, summoner) {
  let hash
  try {
    const hash_ = await fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
      key: name + "'s Crowdsale Terms as prepared by " + summoner,
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

export async function uploadVoteData(dao, chain, proposal, approval, user, signature) {
  console.log(dao, proposal, user, signature)
  const voteData = {
    dao: dao,
    chain: chain,
    proposal: proposal,
    approval: approval,
    user: user,
    signature: signature,
  }
  const data = JSON.stringify(voteData)

  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
    key: 'Vote Signature by ' + user + ' for ' + dao + ' proposal ' + proposal,
    data: data,
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
    console.log('Something wrong with Fleek upload.')
  }
}

export async function fetchVoteJson(dao, proposal, user) {
  // console.log(dao, proposal, user)
  try {
    const hash_ = await fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: 'fa221543-b374-4588-8026-c2c9aefa4206-bucket',
      key: 'Vote Signature by ' + user + ' for ' + dao + ' proposal ' + proposal,
      getOptions: ['hash'],
    })
    // console.log(hash_)
    if (hash_.hash) {
      // console.log('vote ssig hash', hash_.hash)
      const url = 'https://ipfs.io/ipfs/' + hash_.hash
      const response = await fetch(url)
      const json = await response.json()

      return json
    } else {
      return 'none'
    }
  } catch (e) {
    console.log(e)
    console.log('Error retrieving vote signatures.')
  }
}

export async function fetchVoteData(dao, proposal, members) {
  let votes = []
  for (let i = 0; i < members.length; i++) {
    try {
      const json = await fetchVoteJson(dao, proposal, ethers.utils.getAddress(members[i]))
      if (json == 'none') {
        return 'none'
      } else {
        const vote = {
          member: members[i],
          signature: json.signature,
          approval: json.approval,
        }
        // console.log(vote)
        votes.push(vote)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return votes
}
