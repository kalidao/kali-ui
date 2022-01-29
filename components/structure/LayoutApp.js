import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Container, HStack, Center, Spacer, VStack, Wrap, WrapItem, Box } from "@chakra-ui/react";
import Head from "next/head";
import NavRightContainer from "./NavRightContainer";
import Kali from "./Kali";
import KaliIcon from "../elements/KaliIcon";
import ActionMenu from "./ActionMenu";
import LoadingIndicator from "./Loading";
import Footer from "./Footer";
import { BrowserView, MobileView } from "react-device-detect";

export default function Layout(props) {
  const value = useContext(AppContext);
  const { loading } = value.state;
  return (
    <>
      {loading == true ? <LoadingIndicator /> : ""}
      <Head>
        <title>KaliDAO</title>
        <meta
          property="og:title"
          content="optimized DAC protocol"
          key="title"
        />
      </Head>

        <Wrap
          spacing={0}
          alignItems="top"
          w="100vw"
          minH="100vh"
        >
        <WrapItem
          display={{ base: 'block', sm: 'none', md: 'block', lg: 'block' }}
          width="20vw"
        >
          <Container
            id="dao-sidebar"
            h="100vh"
            m={0}
            minH="100vh"
            width="100%"
          >
            <Center>
              <KaliIcon />
            </Center>
            <VStack
              id="action-menu"
              gap={3}
            >
              <ActionMenu />
            </VStack>
            </Container>
          </WrapItem>
          <WrapItem
            w={{sm: '100vw', md: '80vw', lg: '80vw', xl: '80vw', '2xl': '80vw'}}
            minH="100vh"
          >
            <Box
              id="dao-main"
              alignItems="center"
              justifyContent="center"
              w="100%"
              p={0}
              m={0}
            >
              <HStack>
                <Spacer />
                <NavRightContainer color="#5a2686" borderColor="#5a2686" />
              </HStack>

              <Box minH="100vh">
              {props.children}
              </Box>

              <Footer />
            </Box>
          </WrapItem>
        </Wrap>
        <Box id="mobile-menu" display={{ base: 'none', sm: 'block', md: 'none', lg: 'none', xl: 'none', '2xl': 'none' }}>
            <ActionMenu />
        </Box>
    </>
  );
}
