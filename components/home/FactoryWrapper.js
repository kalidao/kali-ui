import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import ChooseNetwork from "./ChooseNetwork";
import ChooseIdentity from "./ChooseIdentity";
import ChooseType from "./ChooseType";
import ChooseCustom from "./ChooseCustom";
import ChooseMembers from "./ChooseMembers";
import ChooseDocs from "./ChooseDocs";
import Checkout from "./Checkout";
import StepProgressBar from "./StepProgressBar";

export default function FactoryWrapper() {
  const [visible, setVisible] = useState(0);
  const [details, setDetails] = useState({
    network: 1,
    identity: {
      daoName: null,
      symbol: null,
    },
    daoType: null,
    founders: {
      members: null,
      shares: null,
    },
    governance: {
      votingPeriod: 1,
      paused: 1,
      quorum: 10,
      supermajority: 60,
    },
    extensions: {
      tribute: {
        active: false,
      },
      redemption: {
        active: false,
        redemptionStart: 0,
      },
      crowdsale: {
        active: false,
        purchaseToken: null,
        purchaseMultiplier: 10,
        purchaseLimit: null,
        saleEnds: 0,
        listId: null,
        documentation: "",
      },
    },
    daoType: null,
    legal: {
      docs: null,
      docType: 999,
    },
  });
  console.log("details", details);

  const [daoNames, setDaoNames] = useState(null);

  const handleNext = () => {
    setVisible(visible + 1);
  };

  const handleBack = (num) => {
    if (num < visible) {
      setVisible(num);
    }
  };

  const views = [
    <ChooseNetwork
      key="0"
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <ChooseIdentity
      key="1"
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
      daoNames={daoNames}
      setDaoNames={setDaoNames}
    />,
    <ChooseType
      key="2"
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <ChooseCustom
      key="3"
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <ChooseMembers
      key="4"
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <ChooseDocs
      key="5"
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <Checkout
      key="6"
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
      daoNames={daoNames}
    />,
  ];

  return (
    <VStack>
      <StepProgressBar
        steps={views.length}
        visible={visible}
        handleBack={handleBack}
      />
      {views[visible]}
    </VStack>
  );
}
