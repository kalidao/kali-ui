interface Extension {
  label: string
  labels: string[]
  types: string[]
  display: string[]
}

export const getExtensionLabel = (type: string): string => {
  return extensionsHelper[type].label
}

export const extensionsHelper: { [key: string]: Extension } = {
  crowdsale2: {
    label: 'Swap',
    labels: [
      'Sale Type',
      'Purchase Ratio',
      'Purchase Asset',
      'Sale Ends',
      'Purchase Limit',
      'Personal Limit',
      'Details',
    ],
    types: ['uint256', 'uint256', 'address', 'uint32', 'uint96', 'uint96', 'string'],
    display: ['saleType', 'swapRatio', 'token', 'date', 'BigNumber', 'BigNumber', 'link'],
  },
  redemption: {
    label: 'Redemption',
    labels: ['Redeemable Tokens', 'Starts From'],
    types: ['address[]', 'uint256'],
    display: ['array', 'date'],
  },
  projectManagement: {
    label: 'Project Management',
    labels: ['ID', 'Manager', 'Budget', 'Deadline', 'Goals'],
    types: ['uint256', 'address', 'uint256', 'uint256', 'string'],
    display: ['id', 'address', 'BigNumber', 'date', 'json'],
  },
}
