# About

You can find the latest deployment at https://app.kalidao.xyz/

# Getting Started Instructions

## Install

Install Node dependencies: `pnpm install`

## Local Development

1. Build graph-client: `pnpm build-client`
2. Start the app: `pnpm dev`
3. View the app at localhost:3000

## Environment settings

During development, your `.env.local` file should have the following parameters defined:

### Fleek Storage API

Kali UI uses Fleek's IPFS storage API to upload documents related to on-chain transactions, such as DAO proposals.
You can learn about this Fleek Storage API and how to get your own API keys [here](https://blog.fleek.co/posts/guide-to-fleek-storage-js).
The fleek API API bucket, key and secret should be provided as environment variables to the Kali UI app.

```
NEXT_PUBLIC_FLEEK_STORAGE_BUCKET=
NEXT_PUBLIC_FLEEK_API_KEY=
NEXT_PUBLIC_FLEEK_API_SECRET=

```
