import React, { useState, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/dao-dashboard/layout'
import { Box, Text } from '@kalidao/reality'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@design/Tabs'
import { Tokens, NFTs } from '@components/dao-dashboard/treasury'
import Moralis from 'moralis'

const Treasury: NextPage = ({ tokenBalance, nftBalance }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log('values', tokenBalance, nftBalance)
  return (
    <Layout heading={`Treasury`} content="Look at the treasury analytics for the DAO.">
      <Box>
        <Tabs defaultValue="token">
          <TabsList>
            <TabsTrigger value="token">Tokens</TabsTrigger>
            <TabsTrigger value="nft">NFTs</TabsTrigger>
          </TabsList>
          <TabsContent value="token">
            {tokenBalance !== '' ? (
              <Tokens tokenBalance={tokenBalance} />
            ) : (
              <Text>We are working on bringing Treasury support for your chain.</Text>
            )}
          </TabsContent>
          <TabsContent value="nft">
            {nftBalance !== '' ? (
              <NFTs nftBalance={nftBalance ? nftBalance['result'] : null} />
            ) : (
              <Text>We are working on bringing Treasury support for your chain.</Text>
            )}
          </TabsContent>
        </Tabs>
      </Box>
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
    ]);
    console.log(tokenBalance, nftBalance)

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
      tokens: notSupported,
      nftBalance: notSupported,
    },
  }
}

export default Treasury
