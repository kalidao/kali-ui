module.exports = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  env: {
    INFURA_ID: process.env.INFURA_ID,
    EMAIL_ID: process.env.EMAIL_ID,
  },
};
