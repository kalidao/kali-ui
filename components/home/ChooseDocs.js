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

export default function ChooseDocs({ details, setDetails, handleNext }) {
  const value = useContext(AppContext);
  const { web3, chainId, loading, account } = value.state;
  const [selectedType, setSelectedType] = useState(999);
  const [url, setUrl] = useState(null);
  const [mission, setMission] = useState(null);
  const [city, setCity] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (details["legal"]["docType"] != null) {
      setSelectedType(details["docType"]);
    }
  }, [details]);

  const handleSelect = (e) => {
    setUrl("");
    setCity("");
    setMission("");
    setProject("");
    let type = e.target.value;

    switch (type) {
      case "0":
        details["legal"]["docs"] = "none";
        details["legal"]["docType"] = "none";
      case "1":
        details["legal"]["docs"] = "";
        details["legal"]["docType"] = "Delaware Ricardian LLC";
      case "2":
        details["legal"]["docType"] = "Delaware LLC";
        break;
      case "3":
        details["legal"]["docType"] = "Delaware IC";
        break;
      case "4":
        details["legal"]["docType"] = "Wyoming LLC";
        break;
      case "5":
        details["legal"]["docType"] = "Delaware UNA";
        break;
      case "6":
        details["legal"]["docType"] = "Swiss Verein";
        break;
      case "7":
        details["legal"]["docType"] = "none";
    }

    setSelectedType(type);
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
      url ? (details["legal"]["docs"] = url) : null;
      details["misc"]["mission"] = mission;
      details["misc"]["city"] = city;
      details["misc"]["project"] = project;
      handleNext();
    }

    console.log(details);
  };

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
          {/* <option className="option" value="999"></option> */}
          <option value="0">None</option>
          <option value="1">Series LLC (Instant)</option>
          <option value="2">Delaware LLC</option>
          <option value="3">Delaware Investment Club</option>
          <option value="4">Wyoming LLC</option>
          <option value="5">UNA</option>
          <option value="6">Swiss Verein</option>
          <option value="7">Custom</option>
        </Select>
        {selectedType == 5 ? (
          <VStack w="90%">
            <FormControl isRequired>
              <FormLabel mt={3} htmlFor="url">
                Link to DAO Mission
              </FormLabel>
              <Input
                isRequired
                id="url"
                placeholder="URL"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
              />
            </FormControl>
          </VStack>
        ) : null}
        {selectedType == 6 ? (
          <FormControl isRequired>
            <FormLabel mt={3} htmlFor="city">
              City of Switzerland
            </FormLabel>
            <Input
              id="city"
              placeholder="Zug"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FormLabel mt={3} htmlFor="project">
              Project Name
            </FormLabel>
            <Input
              id="project"
              placeholder="Name of project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
            <FormLabel mt={3} htmlFor="url">
              Link to DAO Mission
            </FormLabel>
            <Input
              id="url"
              placeholder="URL"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
            />
          </FormControl>
        ) : null}
        {selectedType == 7 ? (
          <VStack w="90%">
            <FormControl isRequired>
              <FormLabel mt={3} htmlFor="url">
                Link to Custom Document
              </FormLabel>
              <Input
                isRequired
                id="url"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </FormControl>
          </VStack>
        ) : null}
      </VStack>
      <VStack>
        <br></br>
        <>
          {selectedType == 1 ? (
            <HStack w="70%">
              <Icon as={AiOutlineInfoCircle} />
              <Text as="i">
                Your DAO will mint a NFT under KaliCo Ricardian LLC, a Delaware
                Series,{" "}
                <Link
                  href="https://docs.kalidao.xyz/#kalico-ricardian-llc"
                  target="_blank"
                  isExternal
                  rel="open referrer"
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
            <Button className="transparent-btn" onClick={validate}>
              Next
            </Button>
          ) : null}
        </>
      </VStack>
    </>
  );
}
