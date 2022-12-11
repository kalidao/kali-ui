interface Option {
  label: string
  value: string
}

interface Template {
  jurisdiction: string
  link: string 
}

interface Entity {
  text: string
  jurisdiction: Option[]
  template: Template[]
  docs: string
  email: boolean
  mission: boolean
  message: string
  input?: boolean
  isJurisdiction?: boolean
}


export const legalEntities: { [key: string]: Entity } = {
  llc: {
    text: 'Series LLC',
    jurisdiction: [{
      label: 'Delaware',
      value: 'del',
    }, {
      label: 'Wyoming',
      value: 'wyo',
    }],
    template: [{
      jurisdiction: 'del',
      link: 'https://gateway.pinata.cloud/ipfs/QmUDZw3ALFXcbHvUseyjLeq8AbXDrQwfrwCdgL6XngiNnt',
    }, {
      jurisdiction: 'wyo',
      link: 'https://gateway.pinata.cloud/ipfs/QmUDZw3ALFXcbHvUseyjLeq8AbXDrQwfrwCdgL6XngiNnt',
    }],
    docs: '',
    email: true,
    mission: false,
    message:
      'Your series will be formed instantly, but we will follow up to request information we must keep on file for your series.',
    isJurisdiction: true,
  },
  una: {
    text: 'UNA',
    jurisdiction:  [{
      label: 'Delaware',
      value: 'del',
    }, {
      label: 'Wyoming',
      value: 'wyo',
    }],
    template: [{
      jurisdiction: 'del',
      link: 'https://gateway.pinata.cloud/ipfs/QmUDZw3ALFXcbHvUseyjLeq8AbXDrQwfrwCdgL6XngiNnt',
    }, {
      jurisdiction: 'wyo',
      link: 'https://gateway.pinata.cloud/ipfs/QmUDZw3ALFXcbHvUseyjLeq8AbXDrQwfrwCdgL6XngiNnt',
    }],
    docs: 'UNA',
    email: false,
    mission: true,
    message: 'Your Delaware UNA will be formed instantly.',
    isJurisdiction: true,
  },
}
