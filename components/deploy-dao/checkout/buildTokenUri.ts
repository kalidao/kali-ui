import { convertIpfsHash } from "@utils/convertIpfsHash"

export default async function buildTokenUri(name: string, tokenId: number, entity: string, agreement: string) {
  let obj
  let attributes
  switch (entity) {
    case 'deLLC':
      attributes = deLLC.attributes
      attributes[2].value = agreement
      obj = { ...deLLC, name: name, attributes: [...attributes] }
      break
    case 'wyLLC':
      attributes = wyLLC.attributes
      attributes[2].value = agreement
      obj = {
        ...wyLLC,
        name: `Wrappr LLC - ${name} - Series ${tokenId}`,
        attributes: [...attributes],
      }
      break
    case 'deUNA':
      attributes = deUNA.attributes
      attributes[2].value = agreement
      obj = { ...deUNA, name: name, attributes: [...attributes] }
      break
    case 'wyUNA':
      attributes = wyUNA.attributes
      attributes[2].value = agreement
      obj = { ...wyUNA, name: name, attributes: [...attributes] }
      break
    case 'lexCharter':
      attributes = lexCharter.attributes
      attributes[1].value = agreement
      obj = {
        ...lexCharter,
        name: name,
        attributes: [...attributes],
      }
      break
    // TODO //WIP
    case 'orCharter':
      attributes = orCharter.attributes
      attributes[2].value = agreement
      obj = {
        ...orCharter,
        name: name,
        attributes: [...attributes],
      }
      break
  }

  try {
    // idk ts :(
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

const deLLC = {
  name: '{name}  Wrappr LLC (Delaware)', // user
  description: 'Secure your wallet or DAO as an LLC (Series) and make agreements',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmZCCV9ojSQUsvUtsDV6HdxUrijkF79ZWUs315b7WKPT3g',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Delaware' },
    { trait_type: 'Entity', value: 'LLC' },
    { trait_type: 'Agreement', value: 'https://del.llc.wrappr.documen.eth.link/' },
    { trait_type: 'Registered Agent', value: 'A Registered Agent, Inc., 8 The Green, Suite A, Dover, DE 19901, USA' },
    { display_type: 'number', trait_type: 'Registration Number', value: 6531147 },
  ],
}

const wyLLC = {
  name: 'Wrappr LLC (Wyoming)',
  description: 'Secure your wallet or DAO as an LLC (Series) and make agreements',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmVEmynzYzRjYhBzCK85eNBMPaL3PMLvy7GCDiNb6oH7sY',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Wyoming' },
    { trait_type: 'Entity', value: 'LLC' },
    { trait_type: 'Agreement', value: 'https://wy.llc.wrappr.documen.eth.link/' },
    { trait_type: 'Registered Agent', value: 'Registered Agents Inc., 30 N Gould St Ste R, Sheridan, WY 82801, USA' },
    { display_type: 'number', trait_type: 'Registration Number', value: 2022001140872 },
  ],
}

const deUNA = {
  name: 'Wrappr UNA (Delaware)',
  description: 'Secure your DAO as UNA non-profit and qualify for tax benefits',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmYVGfZd9djKd7ExpTKPzbV5qMNqHT6XPxAdweg4ptowEo',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Delaware' },
    { trait_type: 'Entity', value: 'UNA' },
    { trait_type: 'Agreement', value: 'https://del.una.wrappr.documen.eth.link/' },
  ],
}

const wyUNA = {
  name: 'Wrappr UNA (Wyoming)',
  description: 'Secure your DAO as UNA non-profit and qualify for tax benefits',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://gateway.pinata.cloud/ipfs/QmNndADsqj7s4NC2tRraGxhSffCbdN1eHpPdusBQE4c84k',
  attributes: [
    { trait_type: 'Jurisdiction', value: 'Wyoming' },
    { trait_type: 'Entity', value: 'UNA' },
    { trait_type: 'Agreement', value: 'https://wy.una.wrappr.documen.eth.link/' },
  ],
}

// TODO
const lexCharter = {
  name: 'LeXpunK DAO Charter',
  description:
    'Create a stateless entity with qualified code deference.\n\nReview the DAO Charter and Wrappr docs to understand your CHARTER NFT.',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://content.wrappr.wtf/ipfs/QmVPv3D1ZFPar6NEXoNTxyiknHG7pKfx21iyCb6siBcoqK',
  attributes: [
    { trait_type: 'Entity', value: 'Charter' },
    { trait_type: 'Agreement', value: 'https://lexpunk.charter.ricardian.eth.limo/' },
  ],
}

const orCharter = {
  name: 'Orange Charter',
  description:
    'Create a stateless entity with qualified code deference.\n\nReview the DAO Charter and Wrappr docs to understand your CHARTER NFT.',
  external_url: 'https://www.wrappr.wtf/',
  image: 'https://content.wrappr.wtf/ipfs/QmZvpnHg2PZe8SqGEPsnsDoHe57cfR9PMDGTfW5wrLrsxM',
  attributes: [
    { trait_type: 'Entity', value: 'Charter' },
    { trait_type: 'Agreement', value: 'https://orange.charter.ricardian.eth.limo/' },
  ],
}
