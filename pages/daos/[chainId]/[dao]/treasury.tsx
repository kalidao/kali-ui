import React, { useState, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { Stack, Button, Box, Text } from '@kalidao/reality'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@design/Tabs'
import { Tokens, NFTs } from '@components/dao-dashboard/treasury'
import Moralis from 'moralis'

const Treasury: NextPage = ({ tokenBalance, nftBalance }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [show, setShow] = useState('tokens')

  const render = () => {
    if (show === 'tokens') {
      if (tokenBalance?.notSupported) {
        return <Text>We are working on bringing Treasury support for your chain.</Text>
      } else {
        return <Tokens tokenBalance={tokenBalance} />
      }
    }

    if (show === 'nft') {
      if (nftBalance?.notSupported) {
        return <Text>We are working on bringing Treasury support for your chain.</Text>
      } else {
        return <NFTs nftBalance={nftBalance} />
      }
    }
  }

  return (
    <Layout heading={`Treasury`} content="Look at the treasury analytics for the DAO.">
      <Stack>
        <Stack direction="horizontal">
          <Button variant={show === 'tokens' ? 'secondary' : 'transparent'} onClick={() => setShow('tokens')}>
            Tokens
          </Button>
          <Button variant={show === 'nft' ? 'secondary' : 'transparent'} onClick={() => setShow('nft')}>
            NFTs
          </Button>
        </Stack>
        <Box minHeight="96" width="320">
          {render()}
        </Box>
      </Stack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = context?.params?.dao as string
  const chainId = context?.params?.chainId

  if (chainId == '137' || chainId == '1') {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })
    const [tokenBalance, nftBalance] = await Promise.all([
      Moralis.EvmApi.token.getWalletTokenBalances({
        address,
        chain: Number(chainId),
      }),
      Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain: Number(chainId),
      }),
    ])

    return {
      props: {
        tokenBalance: tokenBalance.result.map((token) => JSON.parse(JSON.stringify(token))),
        nftBalance: JSON.parse(JSON.stringify(nftBalance)),
      },
    }
  }

  const notSupported = {
    notSupported: true,
  }

  return {
    props: {
      tokenBalance: notSupported,
      nftBalance: notSupported,
    },
  }
}

export default Treasury
