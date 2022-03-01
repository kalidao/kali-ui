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
    <>
      {loading == true ? <LoadingIndicator /> : ""}
      <Box id="deployer-container" color="kali.900" className="gradient">
        <Head>
          <title>KaliDAO</title>
          <meta
            property="og:title"
            content="DAO Launcher with Legal Benefits"
            key="title"
          />
        </Head>
        <div id="gradient1" />
        <div id="gradient2" />
        <Nav
          style={{
            overflowX: "hidden !important",
          }}
          draftActive={props.draftActive}
        />
        <Container
          minH="80vh"
          maxW="container.lg"
          alignItems="center"
          justifyContent="center"
          style={{
            overflowX: "hidden !important",
          }}
        >
          <Box minH="70vh">{props.children}</Box>
          <Footer />
        </Container>
      </Box>
    </>
  );
}
