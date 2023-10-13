// TODO: Add kali master for polygon
export const addresses: { [key: number]: any } =
  // organized by chainId
  {
    // Ethereum
    1: {
      name: 'Ethereum',
      factory: '0x8bD48C45d40724E8424C3aAa4097257A38A98024',
      ricardian: '0x2017d429Ad722e1cf8df9F1A2504D4711cDedC49',
      erc20factory: '0x65B2fb10C3D759b8D5828f617d146c5Ec380Ed1D',
      nft: '0x9E7351cA95099496bcAC598Fe4d5201D2B1f9A8d',
      access: '0x7799b86Ada91a507b5cbDA03638116A26A86358d',
      access2: '0x772E8423e2C90835b85126f67D33e89df792De29',
      extensions: {
        tribute: '0x561D9C4EdB64524556856133Bf7B5640dB904656',
        crowdsale: '0xD76B629c528548582Af14c4D3a851830BB0c6978',
        crowdsale2: '0x8a426b34c7a45c8361351f88730ac1d824ec8c58',
        redemption: '0x3c9eB1c92b4063e6B9fA0531bC8966D3a09565D0',
        dataRoom: '0x2608F53DDC70Cd9277569bA678547298B75a5180',
      },
      blockExplorer: 'https://etherscan.io',
      kaliMaster: '0xfc0Fd933D8ef5b7e552E67aCfc4c09711B413f30',
    },
    // Polygon
    137: {
      name: 'Polygon',
      factory: '0xeb37fc7F7781C4B6395b093359aaaFD285DaA6b9',
      ricardian: '0xbE7aDeD5dFCAA0E51F885748AA4DFf457f0c52A0',
      erc20factory: '0xf8468a8A356B1b9DB2E918DbC1Ca31D597c9E54F',
      nft: '0x9BD8D05c793dc5ba044Fe4656b25092b269DfB5D',
      access: '0x43Cc55157d3A4e51ab99CaD6189726D768d7A124',
      access2: '0x00F8F3660de269124378572C4F342F2d81970d7F',
      extensions: {
        tribute: '0xAe3357E4D401495Cfe6e6022734E11293BC63dfb',
        crowdsale: '0x0AE06840C05bf261B1798571696F58F9Ac3b3174',
        crowdsale2: '0x58c9cdDaD6c523834d00A425c46E871e5a195188',
        redemption: '0xC43AE97f12d979FCAe346E93b62d747963956d63',
        dataRoom: '0x2608F53DDC70Cd9277569bA678547298B75a5180',
      },
      blockExplorer: 'https://polygonscan.com',
      kaliMaster: '0x93fd58eDAf318E03eD1941e593D74d88b8F4f599',
    },
    // Arbitrum
    42161: {
      name: 'Arbitrum',
      factory: '0x045cbcBA76a7EcF82d0f6B5DCc0881B3C12E37d0',
      ricardian: '0xB572aC31AB7FE0f8b65E6be10bd36eE81DA71f2B',
      erc20factory: '0x5eeDa4696062Eaa319DDE62d2D350f4aBF0C88F4',
      nft: '0x212CD0DE0C28858Fc72F792bb0F49d3B98d4cd0b',
      access: '0x89832E0DbE3600a7358F2E3eA2d7aF5dc7d76E0C',
      access2: '0x5745F1EB73a45fc4ABb2D9F243B148A6Ae20622e',
      extensions: {
        tribute: '0xf1D291A527281049e66ABD3A41624B13D962868f',
        crowdsale: '0x0bb3F43533FBf16d69dBdccf6AaAef81acd76FAB',
        crowdsale2: '0x38e1C40B8625C26204F90812881652E406148c3c',
        redemption: '0x7452BDCED6f344e0E4e1169377D369aDE1cB0Ca0',
        dataRoom: '0x2608F53DDC70Cd9277569bA678547298B75a5180',
      },
      blockExplorer: 'https://arbiscan.io',
      kaliMaster: '0xffe7e91f86fa2c6af0b3cddf0f0906d465e1d760',
    },
    // Optimism
    10: {
      name: 'Optimism',
      factory: '0xe8E08113Dc0f2B6392A4bD14d7F1d9AA6E89e1e3',
      access2: '0x9E07053081E51F962d51C755272531B0846e4C31',
      extensions: {
        tribute: '0xc64F31b76FDc6B45d703B95A95a3A7F8A0B509aE',
        crowdsale2: '0xB96b13E38caBF09A79A8b6a427FBB9e09A1aB6b2',
        redemption: '0x2b8f116e4D9E73A3A9E7CAF1655B9FC01588Db8d',
      },
      kaliMaster: '0x0D46996D55bB33D32D43E610aac5B64b477e9cBD',
      ricardian: '0x581b5E51fFBB742f92E818Fb177CAD8a30e43f3E',
      blockExplorer: 'https://optimistic.etherscan.io',
    },
    100: {
      name: 'Gnosis',
      factory: '0x5DEfA5A73f75bF9E2E91211C15aaB5DBbeeF2FDe',
      access2: '0x80Df86B9A976A4B89c17765187e92b58110d1B9f',
      extensions: {
        tribute: '0x2e7ba1623880c412989c2cc0593e474D45F9e9e3',
        crowdsale2: '0x376874Adf4146b33afC13a884C31fC3D579Eedf1',
        redemption: '0xd36150A4A2016ed2c5A15d92Bd69EfFe1c4c3aD5',
        dataRoom: '0x2608F53DDC70Cd9277569bA678547298B75a5180',
      },
      kaliMaster: '0x93e9dcFA934664c0651f11e92785eD92B7F05c46',
      ricardian: '0x0000000000000000000000000000000000000000',
      blockExplorer: 'https://blockscout.com/xdai/mainnet',
    },
    // Goerli
    5: {
      name: 'Goerli',
      ricardian: '0x503297a0bf06B1A33124Cd93e486f17A7F7fDF20',
      kaliMaster: '0x0D46996D55bB33D32D43E610aac5B64b477e9cBD',
      factory: '0xDDdFf70C77Cffcf97Fb91F7aC4aD0E12E8C14571',
      erc20factory: '0x2BF66A443C1553d3F9fb41A83804ABC41B8005f7',
      nft: '',
      access2: '0xa9eF2815a4CA3AfaF29c5234b6937A419cEC33a6',
      extensions: {
        tribute: '0xc64F31b76FDc6B45d703B95A95a3A7F8A0B509aE',
        crowdsale2: '0xB682e773768e68C02B8b3892CF32eA090600b4b4',
        redemption: '0x2b8f116e4D9E73A3A9E7CAF1655B9FC01588Db8d',
        project: '0x4777AB9CD9130f9F9062F9f1E0Fa9335e602A0C3',
        dataRoom: '0x2608F53DDC70Cd9277569bA678547298B75a5180',
        projectManagement: '0x9f0ad778385a2c688533958c6ada56f201ffc246',
      },
      blockExplorer: 'https://goerli.etherscan.io/',
    },
  }
