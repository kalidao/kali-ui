import { buildAgreement } from './buildAgreement'
import buildTokenUri from './buildTokenUri'
import { calculateWrapprId } from './calculateWrapprId'
import { wrapprAddresses } from './wrapprAddresses'

export default async function buildWrapprTokenUri(chain, docType, setError, state) {
  const wrapprAddress = wrapprAddresses[chain][docType]
  const wrappr = {
    tokenId: 0,
    tokenUri: '',
  }
  let tokenId = 0
  let agreement
  let tokenUri
  console.log(state)

  // Get Wrappr ID by jurisdiction
  try {
    wrappr.tokenId = await calculateWrapprId(wrapprAddress, chain)
    setError('Fetching legal wrapper template...')
  } catch (e) {
    console.log(e)
    setError("Something's wrong with getting legal wrappr ID!")
  }

  // Build agreement
  try {
    agreement = await buildAgreement(docType, state.name, tokenId, state.mission, 'FOR CHARTER USE', chain)
    if (typeof agreement === 'string') {
      console.log(agreement)
      setError('Populating legal wrapper template...')
    }
  } catch (e) {
    console.log(e)
    setError("Something's wrong with building legal agreement!")
  }

  // Build token URI
  try {
    const res = await buildTokenUri(state.name, tokenId, docType, agreement)
    if (res) {
      wrappr.tokenUri = res
      console.log(wrappr.tokenUri)
      setError('Creating token URI for legal wrapper...')
    }
  } catch (e) {
    console.log(e)
    setError("Something's wrong with building token URI!")
  }

  console.log(wrappr)

  return wrappr
}
