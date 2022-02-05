module.exports = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
    NEXT_PUBLIC_EMAIL_ID: process.env.NEXT_PUBLIC_EMAIL_ID,
  },
};
