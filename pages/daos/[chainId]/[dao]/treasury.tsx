import React, { useState } from 'react'
import { NextPage } from 'next'
import Layout from '@components/dao-dashboard/layout'
import { Stack, Button, Box, Text, Card } from '@kalidao/reality'
import { Tokens, NFTs } from '@components/dao-dashboard/treasury'

const Treasury: NextPage = () => {
  const [show, setShow] = useState('tokens')

  const render = () => {
    if (show === 'tokens') {
      return <Tokens />
    }

    if (show === 'nft') {
      return <NFTs />
    }
  }

  return (
    <Layout title={`Treasury`} content="Look at the treasury analytics for the DAO.">
      <Card padding="6">
        <Stack>
          <Stack direction="horizontal">
            <Button variant={show === 'tokens' ? 'secondary' : 'transparent'} onClick={() => setShow('tokens')}>
              Tokens
            </Button>
            <Button variant={show === 'nft' ? 'secondary' : 'transparent'} onClick={() => setShow('nft')}>
              NFTs
            </Button>
          </Stack>
          <Box>{render()}</Box>
        </Stack>
      </Card>
    </Layout>
  )
}

export default Treasury
