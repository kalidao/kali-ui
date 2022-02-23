import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import {
  Heading,
  Icon,
  HStack,
  Grid,
  Box,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import Reload from "../elements/Reload.js";
import { BiGridAlt } from "react-icons/bi";
import { fetchStaticInfo, fetchMoreInfo } from "../../utils/fetchDaoInfo";
import { addresses } from "../../constants/addresses";
import { factoryInstance } from "../../eth/factory";
import { dashboardHelper } from "../../constants/dashboardHelper";
import WelcomeAlert from "../elements/WelcomeAlert";

export default function Dashboard() {
  const value = useContext(AppContext);
  const { web3, account, abi, chainId, dao, address, daoChain } = value.state;

  const reloadDao = async () => {
    fetchData();
  };

  useEffect(() => {
    if (!dao) {
      fetchData();
    }
  }, [chainId, dao]);

  const toast = useToast();

  async function fetchData() {
    value.setLoading(true);

    try {
      const instance = new web3.eth.Contract(abi, address);

      const factory = factoryInstance(addresses[daoChain]["factory"], web3);

      var { dao_ } = await fetchStaticInfo(
        instance,
        factory,
        address,
        web3,
        daoChain,
        account
      );

      value.setDao(dao_);
      console.log(dao_, "static info");
      value.setLoading(false);

      console.log("dao_", dao_);
      if (dao_ == undefined) {
        if (!toast.isActive("welcome")) {
          toast({
            id: "welcome",
            position: "bottom",
            duration: 100000,
            isClosable: true,
            render: () => <WelcomeAlert />,
          });
        }
        setTimeout(reloadDao, 30000);
        return;
      }

      const { balances, ricardian, extensions } = await fetchMoreInfo(
        instance,
        factory,
        address,
        web3,
        daoChain,
        account
      );
      dao_["balances"] = balances;
      dao_["ricardian"] = ricardian;
      dao_["extensions"] = extensions;

      value.setDao(dao_);
      console.log(dao_);
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }
  }

  return (
    <div id="dashboard">
      <HStack>
        <Icon as={BiGridAlt} w={10} h={10} className="h1-icon" />
        <Heading as="h1">Dashboard</Heading>
      </HStack>
      <HStack>
        <Spacer />
        <Reload reload={reloadDao} />
      </HStack>
      <Grid
        gap={5}
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
      >
        {dao == null || web3 == undefined ? (
          "Loading . . ."
        ) : (
          <>
            {Object.entries(dashboardHelper).map(([k, v]) =>
              dashboardHelper[k]["check"] != null &&
              dao[dashboardHelper[k]["check"]] == null ? null : (
                <div className="gradient-item dashboard-tile">
                  <Box key={`component-${k}`}>
                    <Heading>{dashboardHelper[k]["title"]}</Heading>
                    {dashboardHelper[k]["component"]}
                  </Box>
                </div>
              )
            )}
          </>
        )}
      </Grid>
    </div>
  );
}
