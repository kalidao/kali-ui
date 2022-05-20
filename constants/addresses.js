export const addresses =
  // organized by chainId
  {
    // Ethereum
    1: {
      factory: "0x8bD48C45d40724E8424C3aAa4097257A38A98024",
      ricardian: "0x2017d429Ad722e1cf8df9F1A2504D4711cDedC49",
      erc20factory: "0x65B2fb10C3D759b8D5828f617d146c5Ec380Ed1D",
      nft: "0x9E7351cA95099496bcAC598Fe4d5201D2B1f9A8d",
      access: "0x7799b86Ada91a507b5cbDA03638116A26A86358d",
      extensions: {
        tribute: "0x561D9C4EdB64524556856133Bf7B5640dB904656",
        crowdsale: "0xD76B629c528548582Af14c4D3a851830BB0c6978",
        redemption: "0x3c9eB1c92b4063e6B9fA0531bC8966D3a09565D0",
      },
      blockExplorer: "https://etherscan.io"
    },
    // Rinkeby
    4: {
      factory: "0x1aAF0d0305B8e5685bCA94F35409547fA4bCD548",
      ricardian: "0xd45f8734539792619B3C4BE0e24639845371A481",
      erc20factory: "0x8a23526eDe4d7222150C3dFEFC47902180A19323",
      nft: "0xbC208705aF624bE6AE63B27Cf1b94dbD1d7156d0",
      access: "0x3467B663F6e6B962f4f24aa5dB55e659D108Db9e",
      clubFactory: "0x8Ba8438024fCaFa94C37c6C69D01DDb2Db06ba3A",
      extensions: {
        tribute: "0xd62AB72CC6b53D98eed510646a69B21b77ce5A56",
        crowdsale: "0x30BF15b764A2A096c37f8c8E1b6b43D853db9a36",
        redemption: "0x11f44975e1B204E50108Af6BCB6539798cb15F75",
      },
      blockExplorer: "https://rinkeby.etherscan.io"
    },
    // Polygon
    137: {
      factory: "0xeb37fc7F7781C4B6395b093359aaaFD285DaA6b9",
      ricardian: "0xbE7aDeD5dFCAA0E51F885748AA4DFf457f0c52A0",
      erc20factory: "0xf8468a8A356B1b9DB2E918DbC1Ca31D597c9E54F",
      nft: "0x9BD8D05c793dc5ba044Fe4656b25092b269DfB5D",
      access: "0x43Cc55157d3A4e51ab99CaD6189726D768d7A124",
      extensions: {
        tribute: "0xAe3357E4D401495Cfe6e6022734E11293BC63dfb",
        crowdsale: "0x0AE06840C05bf261B1798571696F58F9Ac3b3174",
        redemption: "0xC43AE97f12d979FCAe346E93b62d747963956d63",
      },
      blockExplorer: "https://polygonscan.com"
    },
    // Arbitrum
    42161: {
      factory: "0x045cbcBA76a7EcF82d0f6B5DCc0881B3C12E37d0",
      ricardian: "0xB572aC31AB7FE0f8b65E6be10bd36eE81DA71f2B",
      erc20factory: "0x5eeDa4696062Eaa319DDE62d2D350f4aBF0C88F4",
      nft: "0x212CD0DE0C28858Fc72F792bb0F49d3B98d4cd0b",
      access: "0x89832E0DbE3600a7358F2E3eA2d7aF5dc7d76E0C",
      extensions: {
        tribute: "0xf1D291A527281049e66ABD3A41624B13D962868f",
        crowdsale: "0x0bb3F43533FBf16d69dBdccf6AaAef81acd76FAB",
        redemption: "0x7452BDCED6f344e0E4e1169377D369aDE1cB0Ca0",
      },
      blockExplorer: "https://arbiscan.io"
    },
  };
