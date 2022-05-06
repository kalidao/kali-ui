import React, { useState } from 'react'
import Layout from '../components/structure/Layout'
import FactoryWrapper from '../components/home/FactoryWrapper'
import HomeTile from '../components/home/HomeTile'
import { Container } from '@chakra-ui/react'
export default function Home() {
  const [deployerVisible, setDeployerVisible] = useState(false)

  return (
    <Layout draftActive={true}>
      <Container
        minH="80vh"
        maxW="container.lg"
        alignItems="center"
        justifyContent="center"
        style={{
          overflowX: 'hidden !important',
        }}
      >
        {deployerVisible == false ? <HomeTile setDeployerVisible={setDeployerVisible} /> : <FactoryWrapper />}
      </Container>
    </Layout>
  )
}
