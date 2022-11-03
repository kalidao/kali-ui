const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: 'short',
})

const config = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.moralis.io',
      'gateway.moralisipfs.com',
      'gateway.pinata.cloud',
      'ipfs.infura.io',
      'raw.githubusercontent.com',
      'ipfs.io',
      'content.wrappr.wtf',
    ],
  },
  swcMinify: true,
}

module.exports = withVanillaExtract(config)
