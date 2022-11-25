interface Entity {
  text: string
  template: string | null
  docs: string
  email: Boolean
  mission: Boolean
  message: string
  input?: Boolean
}

export const legalEntities: { [key: string]: Entity } = {
  series: {
    text: 'Series LLC',
    template: 'https://gateway.pinata.cloud/ipfs/QmUDZw3ALFXcbHvUseyjLeq8AbXDrQwfrwCdgL6XngiNnt',
    docs: '',
    email: true,
    mission: false,
    message:
      'Your series will be formed instantly, but we will follow up to request information we must keep on file for your series.',
  },
  delawareUNA: {
    text: 'Delaware UNA',
    template: 'https://gateway.pinata.cloud/ipfs/QmSEEcunxFs8oRQbPaoeV2pYBYJihpZUx6QYUsUqc89Gci',
    docs: 'UNA',
    email: false,
    mission: true,
    message: 'Your Delaware UNA will be formed instantly.',
  },
  verein: {
    text: 'Swiss Verein',
    template: null,
    docs: 'none',
    email: true,
    mission: false,
    message: 'We will contact you to provide options for registering a Swiss Verein and the associated costs.',
  },
  delawareLLC: {
    text: 'Delaware LLC',
    template: null,
    docs: 'none',
    email: true,
    mission: false,
    message:
      'It will take around 1-2 weeks to establish a Delaware LLC. We will contact you to provide options for registering a Delaware LLC and the associated costs.',
  },
  wyomingLLC: {
    text: 'Wyoming LLC',
    template: null,
    docs: 'none',
    email: true,
    mission: false,
    message:
      'It will take around 1-2 weeks to establish a Wyoming LLC. We will contact you to provide options for registering a Wyoming LLC and the associated costs.',
  },
  custom: {
    text: 'Custom Entity Type',
    template: null,
    docs: 'none',
    email: true,
    mission: false,
    message: 'We will contact you to provide options for your desired entity type and the associated costs.',
  },
  existing: {
    text: 'Existing Entity',
    template: null,
    docs: 'none',
    email: false,
    mission: false,
    input: true,
    message: 'The provided document will be linked to your DAO.',
  },
}
