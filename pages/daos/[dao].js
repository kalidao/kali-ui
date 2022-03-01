import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import Layout from "../../components/structure/Layout";
import Proposals from "../../components/proposals/Proposals";
import NewProposal from "../../components/newproposal/NewProposal";
import Dashboard from "../../components/dashboard/Dashboard";
import ActionMenu from "../../components/structure/ActionMenu";
import Extensions from "../../components/extensions/Extensions";

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
    </Layout>
  );
}
