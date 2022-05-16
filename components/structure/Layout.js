import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Nav from './Nav'
import LoadingIndicator from './Loading'
import Footer from './Footer'

export default function Layout(props) {
  const value = useContext(AppContext)
  const { loading } = value.state

  return (
    <>
      {loading == true ? <LoadingIndicator /> : ''}
      <Flex
        minHeight="100vh"
        maxW="2000px"
        flexDir={['column', 'column', 'column']}
        id="main-container"
        color="kali.900"
        className="gradient"
        overflow="hidden"
      >
        <Head>
          <title>KaliDAO</title>
          <meta property="og:title" content="DAO Launcher with Legal Benefits" key="title" />
        </Head>
        <div id="gradient1" />
        <div id="gradient2" />
        <Nav
          style={{
            overflowX: 'hidden !important',
          }}
          draftActive={props.draftActive}
        />
        <Flex minH="80vh">{props.children}</Flex>
        <Footer />
      </Flex>
    </>
  )
}
