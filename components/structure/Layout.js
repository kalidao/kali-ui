import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Nav from "./Nav";
import LoadingIndicator from "./Loading";
import Footer from "./Footer";

export default function Layout(props) {
  const value = useContext(AppContext);
  const { loading } = value.state;

  return (
    <Box minH="100vh" minW="auto" p={2} color="kali.900">
      {loading == true ? <LoadingIndicator /> : ""}
      <Head>
        <title>KaliDAO</title>
        <meta
          property="og:title"
          content="optimized DAC protocol"
          key="title"
        />
      </Head>
      <div id="gradient1"></div>
      <div id="gradient2"></div>
      <Nav />
      <Container
        minH="80vh"
        maxW="container.lg"
        alignItems="center"
        justifyContent="center"
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
}
