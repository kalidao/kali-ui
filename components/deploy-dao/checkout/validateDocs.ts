// TODO: put UNA template on-chain, return hash
export default function validateDocs(type: string, existingDocs?: string) {
  switch (type) {
    case 'series':
      return ''
    case 'delawareUNA':
      return 'none'
    case 'verein':
      return 'none'
    case 'delawareLLC':
      return 'none'
    case 'wyomingLLC':
      return 'none'
    case 'custom':
      return 'none'
    case 'existing':
      return existingDocs
    case 'none':
      return 'none'
    default:
      return new Error('Invalid type.')
  }
}
