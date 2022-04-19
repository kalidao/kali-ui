import fleek from "@fleekhq/fleek-storage-js";
import fleekStorage from '@fleekhq/fleek-storage-js'


// ----- Pre-DAO Deployment -----

// Upload incorporation docs
export async function ipfsIncorporationDoc(name, summoner, doc) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
    key: name + "'s Incoporation Document as summoned by " + summoner,
    data: doc,
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + "% done");
    },
  };

  try {
    const result = await fleek.upload(input);
    console.log("Image hash from Fleek: " + result.hash);
    return result.hash
  } catch (e) {
    console.log(e);
  }
} 

// Upload crowdsale terms
export async function ipfsCrowdsaleTerms(name, summoner, terms) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
    key: name + "'s Crowdsale Terms as prepared by " + summoner.toLowerCase(),
    data: terms,
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + "% done");
    },
  };

  try {
    const result = await fleek.upload(input);
    console.log("Image hash from Fleek: " + result.hash);
    return result.hash
  } catch (e) {
    console.log(e);
  }
} 

// ----- Post-DAO Deployment -----

// General use case
export async function uploadIpfs(dao, content, attachment) {
  const input = {
    apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
    apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
    bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
    key: "DAO (" + dao + ")'s " + content + " is attached with "  + attachment.name,
    data: attachment,
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + "% done");
    },
  };

  try {
    const result = await fleek.upload(input);
    console.log("Image hash from Fleek: " + result.hash);
    return result.hash
  } catch (e) {
    console.log(e);
  }
} 

export async function fetchCrowdsaleTermsHash(name, summoner) {
  let hash;
  try {
    hash = await fleekStorage.get({
      apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
      apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
      bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
      key: name + "'s Crowdsale Terms as prepared by " + summoner,
      getOptions: ["hash"],
    });
  } catch (e) {
    console.log("Error retrieving terms.")  
  }
  return hash;
} 
