import { uploadAgreement } from './uploadAgreement'

export async function buildAgreement(
  template_name: string,
  name: string,
  tokenId: string,
  mission: string,
  jurisdiction: string,
  chainId: string,
) {
  let agreement_params
  switch (template_name) {
    case 'deLLC':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
      }
      break
    case 'wyLLC':
      agreement_params = {
        name: `Wrappr LLC - ${name} - Series ${tokenId}`,
        ricardianId: `${chainId}:${tokenId}`,
      }
      break
    case 'deUNA':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: mission,
      }
      break
    case 'wyUNA':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: mission,
      }
      break
    case 'lexCharter':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: mission,
        jurisdiction: jurisdiction,
      }
      break
    case 'orCharter':
      agreement_params = {
        name: name,
        ricardianId: `${chainId}:${tokenId}`,
        mission: mission,
        jurisdiction: jurisdiction,
      }
      break
  }
  try {
    const obj = {
      template_name: template_name,
      agreement_params: agreement_params,
    }
    const res = await fetch('https://engine.wrappr.wtf/v1/gen', {
      method: 'POST',
      headers: {
        Accept: 'application/pdf',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
    const blob = await res.blob()
console.log(res)
    if (res.ok) {
      const formData = new FormData()
      formData.append('file', blob, 'agreement.pdf')
      const upload = await uploadAgreement(formData)
      if (upload) {
        return upload
      }
    } else {
      return Error(`${res.status.toString()} ${res.statusText}`)
    }
  } catch (e) {
    console.error('Error', e)
    return Error(`${e}`)
  }
}
