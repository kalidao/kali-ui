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
    network: 999,
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
      votingPeriod: 60,
      paused: 1,
      quorum: 10,
      supermajority: 60,
    },
    extensions: {
      tribute: null,
      redemption: {
        redemptionStart: null,
      },
      crowdsale: {
        saleEnds: null,
      },
    },
    daoType: null,
    legal: {
      docs: null,
      docType: null,
    },
  });
  console.log("details", details);

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
