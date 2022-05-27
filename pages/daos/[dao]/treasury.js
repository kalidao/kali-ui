import React from 'react'
import Layout from "../../../components/dao-dashboard/layout/"
import { Flex } from '../../../styles/elements'
import { Tabs,  TabsList, TabsTrigger, TabsContent} from '../../../styles/Tabs'
export default function MembersPage() {
  return (
    <Layout heading={`Treasury`}>
        <Tabs>
            <TabsList>
              <TabsTrigger value="token">Tokens</TabsTrigger>
              <TabsTrigger value="nft">NFTs</TabsTrigger>
            </TabsList>
            <TabsContent value="token">
              Tokens
            </TabsContent>
            <TabsContent value="nft">
              NFTs
            </TabsContent>
        </Tabs>
    </Layout>
  )
}
