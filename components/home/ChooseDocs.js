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
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Select from "../elements/Select";

export default function ChooseDocs({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [selectedType, setSelectedType] = useState(999);

  useEffect(() => {
    if (details["legal"]["docType"] != null) {
      setSelectedType(details["docType"]);
    }
  }, [details]);

  const handleSelect = (e) => {
    let type = e.target.value;
    switch (type) {
      case "0":
        details["legal"]["docs"] = "none";
        details["legal"]["docType"] = "none";
        break
      case "1":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Delaware Ricardian LLC";
        break
      case "2":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Delaware LLC";
        break;
      case "3":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Delaware Investment Club";
        break;
      case "4":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Wyoming LLC";
        break;
      case "5":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Delaware UNA";
        break;
      case "6":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Swiss Verein";
        break;
      case "7":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Custom";
        break
    }
    setSelectedType(type);
    setDetails(details);
  };

  const handleChange = (e) => {
    details["legal"]["docs"] = e.target.value;
    setDetails(details);
  };

  const validate = () => {
    if (selectedType == 5 && mission == "") {
      value.toast("Please fill in the required field.");
    } else if (
      selectedType == 6 &&
      (mission == "" || city == "" || project == "")
    ) {
      value.toast("Please fill in the required fields.");
    } else if (selectedType == 7 && url == "") {
      value.toast("Please enter a valid link.");
    } else {
      handleNext();
    }
  }

  return (
    <>
      <VStack>
        <Heading as="h1">Add legal docs?</Heading>
        <br></br>
        <Select
          id="choose-docs"
          onChange={handleSelect}
          defaultValue={details["legal"]["docType"]}
        >
          <option className="option" value="999"></option>
          <option value="0">None</option>
          <option value="1">Series LLC (Instant)</option>
          <option value="2">Custom Docs</option>
        </Select>
        <br></br>
        {selectedType == 2 || details["legal"]["docType"] == 2 ? (
          <Input
            defaultValue={details["legal"]["docs"]}
            onChange={handleChange}
          />
        ) : null}
      </VStack>
      <VStack>
        <br></br>
        <>
          {selectedType == 1 ? (
            <HStack>
              <Icon as={AiOutlineInfoCircle} />
              <Text as="i">
                Your DAO will mint a NFT under KaliCo Ricardian LLC,
                a Delaware Series, {" "}
                <Link
                  href="https://docs.kalidao.xyz/#kalico-ricardian-llc"
                  target="_blank"
                  isExternal
                  rel="noopener noreferrer"
                  color="kali.800"
                >
                  establishing its own LLC.
                </Link>
                {"  "}
              </Text>
            </HStack>
          ) : null}
          <br></br>
          {selectedType != 999 ? (
            <Button className="transparent-btn" onClick={() => validate()}>
              Next
            </Button>
          ) : null}
        </>
      </VStack>
    </>
  );
}
