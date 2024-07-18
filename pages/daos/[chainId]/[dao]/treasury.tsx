import React, { useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { Tokens, NFTs } from '@components/dao-dashboard/treasury'
import Moralis from 'moralis'
import { Coins, ImageIcon } from 'lucide-react'

const Treasury: NextPage = ({ tokenBalance, nftBalance }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [show, setShow] = useState('tokens')
  console.log('tokenBalance', tokenBalance)

  const render = () => {
    if (show === 'tokens') {
      return <Tokens />
    }

    if (show === 'nft') {
      if (nftBalance?.notSupported) {
        return <p className="text-sm text-gray-500">We are working on bringing Treasury support for your chain.</p>
      } else {
        return <NFTs nftBalance={nftBalance} />
      }
    }
  }

  return (
    <Layout title={`Treasury`} content="Look at the treasury analytics for the DAO.">
      <Card className="p-6">
        <CardContent className="p-0">
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={show === 'tokens' ? 'secondary' : 'ghost'}
                onClick={() => setShow('tokens')}
                className="flex items-center"
              >
                <Coins className="mr-2 h-4 w-4" />
                Tokens
              </Button>
              <Button
                variant={show === 'nft' ? 'secondary' : 'ghost'}
                onClick={() => setShow('nft')}
                className="flex items-center"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                NFTs
              </Button>
            </div>
            <div>{render()}</div>
          </div>
        </CardContent>
      </Card>
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
