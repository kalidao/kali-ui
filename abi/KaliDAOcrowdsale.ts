export const SALE_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'dao',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'callExtension',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'listId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32[]',
        name: 'merkleProof',
        type: 'bytes32[]',
      },
    ],
    name: 'joinList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IKaliAccessManager',
        name: 'accessManager_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'wETH_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'ETHtransferFailed',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'NotListed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NullMultiplier',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PurchaseLimit',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Reentrancy',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SaleEnded',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'extensionData',
        type: 'bytes',
      },
    ],
    name: 'setExtension',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20Permit',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8',
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32',
      },
    ],
    name: 'setPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'TransferFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferFromFailed',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'dao',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'purchaser',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    name: 'ExtensionCalled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'dao',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'listId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'purchaseToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'purchaseMultiplier',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: 'purchaseLimit',
        type: 'uint96',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'saleEnds',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'details',
        type: 'string',
      },
    ],
    name: 'ExtensionSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'crowdsales',
    outputs: [
      {
        internalType: 'uint256',
        name: 'listId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'purchaseToken',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'purchaseMultiplier',
        type: 'uint8',
      },
      {
        internalType: 'uint96',
        name: 'purchaseLimit',
        type: 'uint96',
      },
      {
        internalType: 'uint96',
        name: 'amountPurchased',
        type: 'uint96',
      },
      {
        internalType: 'uint32',
        name: 'saleEnds',
        type: 'uint32',
      },
      {
        internalType: 'string',
        name: 'details',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
