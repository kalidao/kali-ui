import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Container, HStack, Center, Spacer, VStack } from "@chakra-ui/react";
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

      <BrowserView>
        <HStack m={0} alignItems="top">

          <Container
            id="dao-sidebar"
            h="100vh"
            m={0}
            minH="100vh"
            maxW="auto"
            width={{ sm: "200px", md: "250px", lg: "250px" }}
          >
            <Center>
              <KaliIcon />
            </Center>
              <ActionMenu />
          </Container>

          <Container
            id="dao-main"
            maxW="auto"
            alignItems="center"
            justifyContent="center"
          >
            <HStack>
              <Spacer />
              <NavRightContainer color="#5a2686" borderColor="#5a2686" />
            </HStack>
            <Container
              h="auto"
              minH="100vh"
              maxW="auto"
            >
            {props.children}
            </Container>
            <Footer />
          </Container>
        </HStack>
      </BrowserView>

      <MobileView>
        <Container
          id="dao-main-mobile"
          w="100vw"
          minW="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={0} width="100%">

          <NavRightContainer color="#5a2686" borderColor="#5a2686" />

          <Container
            h="auto"
            minH="100vh"
            w="100%"
          >
          {props.children}

          </Container>
          <Footer />
          </VStack>
        </Container>
        <ActionMenu />
      </MobileView>

    </>
  );
}
