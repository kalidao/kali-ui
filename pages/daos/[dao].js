import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import Layout from "../../components/structure/Layout";
import Proposals from "../../components/proposals/Proposals";
import NewProposal from "../../components/newproposal/NewProposal";
import Dashboard from "../../components/dashboard/Dashboard";
import ActionMenu from "../../components/structure/ActionMenu";
import Extensions from "../../components/extensions/Extensions";
import { VStack, Spacer, Link, Box } from "@chakra-ui/react";
import { BrowserView, MobileView } from "react-device-detect";

export default function Dao() {
  const value = useContext(AppContext);
  const { visibleView, daoChain, account } = value.state;
  console.log("account", account);
  // * get DAO address from route * //
  const router = useRouter();
  const address = router.query.dao;
  useEffect(() => {
    if (!address) {
      return;
    } else {
      value.setAddress(address);
    }
  }, [address, value]);

  return (
    <Layout draftActive={false}>
      <Box id="dao-app">
        <Box
          id="dao-sidebar"
          display={{ base: "block", sm: "none", md: "block", lg: "block" }}
        >
          <ActionMenu />
          <Spacer />
          <Link href="https://airtable.com/shr29w0Bm0sTvygyI" isExternal>
            Looking for Contributors?
          </Link>
        </Box>
        <Box>
          {daoChain == null ? null : (
            <>
              {visibleView == 1 ? (
                <Dashboard />
              ) : visibleView == 2 ? (
                <Proposals />
              ) : visibleView == 3 ? (
                <NewProposal />
              ) : visibleView == 4 ? (
                <Extensions />
              ) : null}
            </>
          )}
        </Box>
      </Box>
      <Box
        id="mobile-menu"
        display={{
          base: "none",
          sm: "block",
          md: "none",
          lg: "none",
          xl: "none",
          "2xl": "none",
        }}
      >
        <ActionMenu />
      </Box>
    </Layout>
  );
}
