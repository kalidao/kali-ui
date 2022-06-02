import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Layout from '../../../../components/dao-dashboard/layout/'
import { Text, Flex } from '../../../../styles/elements'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../styles/Tabs'
import { useMoralisWeb3Api } from 'react-moralis'
import { Tokens, NFTs } from '../../../../components/dao-dashboard/treasury/'

export default function TreasuryPage() {
  const router = useRouter()
  const daoAddress = router.query.dao
  const chainId = router.query.chainId
  const Web3Api = useMoralisWeb3Api()
  const [tokenBalance, setTokenBalance] = useState()
  const [nftBalance, setNftBalance] = useState()

  useEffect(async () => {
    const fetch = async () => {
      try {
        const tokenResult = await Web3Api.account.getTokenBalances({
          chain: 'eth',
          address: daoAddress,
        })
        const nftResult = await Web3Api.account.getNFTs({
          chain: 'eth',
          address: daoAddress,
        })

        console.log('token balance', tokenResult)
        console.log('nft balance', nftResult)
        setTokenBalance(tokenResult)
        setNftBalance(nftResult)
      } catch (e) {
        return 'Error'
      }
    }

    return fetch()
  }, [daoAddress])
  return (
    <Layout heading={`Treasury`}>
      <Tabs defaultValue="token">
        <TabsList>
          <TabsTrigger value="token">Tokens</TabsTrigger>
          <TabsTrigger value="nft">NFTs</TabsTrigger>
        </TabsList>
        <TabsContent value="token">
          <Tokens tokenBalance={tokenBalance} />
        </TabsContent>
        <TabsContent value="nft">
          <NFTs nftBalance={nftBalance ? nftBalance['result'] : null} />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}
