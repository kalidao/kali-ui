const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: 'short',
})

const config = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.moralis.io', 'gateway.moralisipfs.com', 'gateway.pinata.cloud', 'ipfs.infura.io'],
  },
  webpack: function (config, options) {
    config.experiments = {
      topLevelAwait: true,
    }
    return config
  },
}

module.exports = withVanillaExtract(config)