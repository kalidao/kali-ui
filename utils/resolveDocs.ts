import { convertIpfsHash } from "./convertIpfsHash"

export const resolveDocs = (docs: string | undefined) => {
  if (docs === undefined)
    return {
      message: 'Fetching...',
    }

  console.log('docs', docs.slice(0, 4))
  if (docs.slice(0, 4) === 'http') {
    return {
      docs: docs,
      message: '',
      isLink: true,
    }
  }

  switch (docs) {
    // TODO
    case '':
      return {
        isRicardian: true,
        message: 'You have a Ricardian LLC. Updating your docs will not affect its status.',
      }
    case 'none': {
      return {
        message: 'We could not find any documents for this DAO.',
      }
    }
    default: {
      return {
        docs: convertIpfsHash(docs),
        message: '',
        isLink: true,
      }
    }
  }
}
