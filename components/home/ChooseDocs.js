import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  VStack,
  HStack,
  Button,
  Text,
  Link,
  Input,
  Heading,
  Icon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Select from "../elements/Select";
import DateSelect from "../elements/DateSelect";
import InfoTip from "../elements/InfoTip";
import HaveEntity from "./docs/HaveEntity";
import WantToLinkDetails from "./docs/WantToLinkDetails";
import WantEntity from "./docs/WantEntity";
import EntityDetails from "./docs/EntityDetails";
import CreateEntity from "./docs/CreateEntity";

export default function ChooseDocs({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [active, setActive] = useState(0);

  const steps = [
    <HaveEntity
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
      setActive={setActive}
    />,
    <WantToLinkDetails
      setActive={setActive}
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <WantEntity
      setActive={setActive}
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <EntityDetails
      setActive={setActive}
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
    <CreateEntity
      details={details}
      setDetails={setDetails}
      handleNext={handleNext}
    />,
  ];

  return (
    <>
      {steps[active]}
      {active == 0 ? null : (
        <Text>
          <Link onClick={() => setActive(0)}>
            <i>« Back</i>
          </Link>
        </Text>
      )}
    </>
  );
}
