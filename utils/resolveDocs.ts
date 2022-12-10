import { convertIpfsHash } from "./convertIpfsHash"

export const resolveDocs = (docs: string | undefined) => {
  if (docs === undefined)
    return {
      message: 'Fetching...',
    }

  if (docs.slice(0, 4) === 'http') {
    return {
      docs: docs,
      message: 'You may review the document here -',
      isRicardian: false,
      isLink: true,
    }
  }

  switch (docs) {
    // TODO
    case '':
      return {
      docs: docs, 
      message: 'You have a Ricardian Series LLC.',
      isRicardian: true,
      isLink: false,
    }
    case 'none': {
      return {
        docs: docs, 
        message: 'We could not find any documents for this DAO.',
        isRicardian: false,
        isLink: false,
      }
    }
    case 'TODO': {
      return {
        docs: docs, 
        message: 'We could not find any documents for this DAO.',
        isRicardian: false,
        isLink: false,
      }
    }
    case 'na': {
      return {
        docs: docs, 
        message: 'We could not find any documents for this DAO.',
        isRicardian: false,
        isLink: false,
      }
    }
    case 'reserved': {
      return {
        docs: docs, 
        message: 'We could not find any documents for this DAO.',
        isRicardian: false,
        isLink: false,
      }
    }
    case 'test': {
      return {
        docs: docs, 
        message: 'We could not find any documents for this DAO.',
        isRicardian: false,
        isLink: false,
      }
    }
    default: {
      return {
        docs: convertIpfsHash(docs),
        message: 'You may review the document here -',
        isLink: true,
        isRicardian: false,
      }
    }
  }
}
