import React, { useEffect, useState } from "react";
import {
  HStack,
  Checkbox,
  Text,
  VStack,
  Switch,
  Spacer,
  Button,
  Input,
  Textarea,
  Box,
} from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import InfoTip from "../elements/InfoTip";
import DateSelect from "../elements/DateSelect";
import Slider from "../elements/Slider";
import Select from "../elements/Select";
import NumInputField from "../elements/NumInputField";
import FileUploader from "../tools/FileUpload";

function ChooseCrowdsale({ details, setDetails, web3, value }) {
  const [crowdsale, setCrowdsale] = useState(
    details["extensions"]["crowdsale"]["active"]
  );

  // sale date conversion
  const nowSale = new Date();
  const [saleEnds, setSaleEnds] = useState(
    nowSale.setDate(
      nowSale.getDate() + details["extensions"]["crowdsale"]["saleEnds"]
    )
  );

  // const [listId, setListId] = useState(
  //   Boolean(details["extensions"]["crowdsale"]["listId"])
  // );

  const [list, setList] = useState("");
  const [islistValidated, setIsListValidated] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);
  const [file, setFile] = useState(null);

  const [purchaseMultiplier, setPurchaseMultiplier] = useState(
    details["extensions"]["crowdsale"]["purchaseMultiplier"]
  );
  const [showSlider, setShowSlider] = useState(false);
  const [showCustomToken, setCustomToken] = useState(false);
  const [showCustomListInput, setShowCustomListInput] = useState(false);
  const [purchaseLimit, setPurchaseLimit] = useState(
    details["extensions"]["crowdsale"]["purchaseLimit"]
  );

  const resolveAddressAndEnsList = async (list) => {
    let list_ = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].slice(-4) === ".eth") {
        const address = await web3.eth.ens.getAddress(list[i]).catch(() => {
          value.toast(list[i] + " is not a valid ENS.");
        });
        list_.push(address);
      } else if (web3.utils.isAddress(list[i]) == false) {
        value.toast(list[i] + " is not a valid Ethereum address.");
        return;
      } else {
        list_.push(list[i]);
      }

      if (list[i] === undefined) {
        return;
      }
    }

    return list_;
  };

  const handlePurchaseToken = (e) => {
    let token = e.target.value;
    switch (token) {
      case "0":
        setCustomToken(false);
        details["extensions"]["crowdsale"]["purchaseToken"] =
          "0x000000000000000000000000000000000000dEaD";
        setDetails(details);
        break;
      case "333":
        setCustomToken(true);
        setDetails(details);
        break;
    }
  };

  const handleCustomToken = async (e) => {
    let token_;
    const token = e.target.value;

    if (token.length == 42) {
      token_ = await resolveAddressAndEnsList([token])
    } else {
      return
    }

    if (token_ != undefined) {
      setIsTokenValidated(true);
    } else {
      return
    }

    details["extensions"]["crowdsale"]["purchaseToken"] = token;
    setDetails(details);
  };

  // const handlePurchaseLimit = (e) => {
  //   const limit = e.target.value;
  //   details["extensions"]["crowdsale"]["purchaseLimit"] = limit;
  //   setDetails(details);
  // };

  const handlePurchaseList = (e) => {
    let list = e.target.value;
    console.log(list)
    switch (list) {
      case "1":
        setShowCustomListInput(false);
        details["extensions"]["crowdsale"]["listId"] = 1;
        setDetails(details);
        break;
      case "custom":
        setShowCustomListInput(true);
        // setDetails(details);
        details["extensions"]["crowdsale"]["listId"] = 333;
        setDetails(details);
        break;
    }
  };

  const handleCustomList = async () => {
    let newList;
    let resolvedList;
    let finalList = [];
    newList = list.split(", ");

    resolvedList = await resolveAddressAndEnsList(newList);

    if (resolvedList === undefined) {
      setIsListValidated(false);
      return;
    } else {
      for (let i = 0; i < resolvedList.length; i++) {
        if (newList[i] === undefined) {
          setIsListValidated(false);
          return;
        } else {
          setIsListValidated(true);
          finalList.push(resolvedList[i]);
        }
      }
    }

    details["extensions"]["crowdsale"]["list"] = finalList;
    setDetails(details);
  };

  const presentSlider = () => {
    if (!showSlider) {
      setShowSlider(true);
    } else {
      setShowSlider(false);
    }
  };

  useEffect(() => {
    console.log('purchase limit', purchaseLimit);
    details["extensions"]["crowdsale"]["purchaseLimit"] = purchaseLimit;
    setDetails(details);
  }, [purchaseLimit])

  useEffect(() => {
    console.log("crowdsale active", crowdsale);
    details["extensions"]["crowdsale"]["active"] = crowdsale;
  }, [crowdsale]);

  // useEffect(() => {
  //   console.log("listId", listId);
  //   details["extensions"]["crowdsale"]["listId"] = Number(listId);
  //   setDetails(details);
  // }, [listId]);

  useEffect(() => {
    details["extensions"]["crowdsale"]["purchaseMultiplier"] =
      purchaseMultiplier;
    setDetails(details);
  }, [purchaseMultiplier]);

  useEffect(() => {
    console.log("saleEnds", saleEnds);
    details["extensions"]["crowdsale"]["saleEnds"] = saleEnds;
    setDetails(details);
  }, [saleEnds]);

  useEffect(() => {
    console.log("upload file - ", file);
    details["extensions"]["crowdsale"]["terms"] = file;
  }, [file]);

  return (
    <VStack align="flex-start" w="100%" >
      <HStack>
        <Checkbox
          name="crowdsale"
          value="crowdsale"
          size="sm"
          isChecked={crowdsale}
          defaultValue={crowdsale}
          onChange={() => setCrowdsale(!crowdsale)}
        >
          <Text fontSize="sm">Crowdsale</Text>
        </Checkbox>
        <InfoTip label={"Sell DAO token for ETH or any ERC20 tokens 🚀"} />
      </HStack>
      {crowdsale ? (
        <VStack spacing={"15px"}>
          <HStack>
            <Text fontSize="md" htmlFor="saleEnds">
              Sale Ends Date
            </Text>
            <ReactDatePicker
              id="date-picker"
              defaultValue={saleEnds}
              selected={saleEnds}
              onChange={(date) => setSaleEnds(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </HStack>
          <VStack w={"100%"} spacing="8" align="flex-start">
            <HStack w={"100%"}>
              <label htmlFor="purchaseToken">Purchase Token</label>
              <InfoTip label="This token will be used to purchase from the sale" />
              <Spacer />
              <Select id="purchaseToken" onChange={handlePurchaseToken}>
                <option value="0">ETH</option>
                <option value="333">Custom</option>
              </Select>
            </HStack>
            {showCustomToken && (
              <VStack w="100%" >
                <Input
                  id="purchaseToken"
                  placeholder="Enter Token Address"
                  onChange={(value) => handleCustomToken(value)}
                />
                {isTokenValidated && <Text fontSize="small" fontStyle="italic">Token contract is valid ✅</Text>}
              </VStack>
            )}
          </VStack>
          <VStack w={"100%"} spacing="8" align="flex-start">
            <HStack w={"100%"}>
              <label htmlFor="purchaseList">Purchase List</label>
              <InfoTip label="Crowdsale for DAO token is limited to the selected group of purchasers ('whitelist')" />
              <Spacer />
              <Select
                w="45%"
                id="purchaseList"
                onChange={handlePurchaseList}
                placeholder="Select"
                value={details["extensions"]["crowdsale"]["listId"]}
              >
                <option value="0">Public</option>
                <option value="1">Accredited</option>
                <option value="custom">Custom</option>
              </Select>
            </HStack>
            {showCustomListInput && (
              <VStack w="100%">
                <HStack w="100%">
                  <Textarea
                    h="initial"
                    id="purchaseList"
                    placeholder="Separate ENS/address by single comma, e.g., *, * "
                    onChange={(e) => setList(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    border="clear"
                    onClick={handleCustomList}
                  >
                    🕵️‍♂️
                  </Button>
                </HStack>
                {islistValidated ? (
                  <Text fontSize="small" fontStyle="italic">
                    ENS/addresses validated ✅
                  </Text>
                ) : (
                  <Text fontSize="small" fontStyle="italic">
                    Please Validate ENS/addresses with 🕵️‍♂️ before "Next"
                  </Text>
                )}
              </VStack>
            )}
          </VStack>
          <VStack w={"100%"} spacing="8" align="flex-start">
            <HStack w={"100%"}>
              <label htmlFor="purchaseMultiplier">Purchase Mulitplier</label>
              <InfoTip
                label={"This determines the shares bought per purchase token"}
              />
              <Spacer />
              <Button
                h={"100%"}
                bg="clear"
                border="0px"
                fontWeight="normal"
                _hover={{ bg: "red" }}
                onClick={() => presentSlider()}
                color="white"
              >
                {purchaseMultiplier}
              </Button>
            </HStack>
            {showSlider && (
              <Slider
                id="purchaseMultiplier"
                min={1}
                max={255}
                defaultValue={10}
                marks={[50, 100, 150, 200]}
                label="Slide purchase multiplier"
                onChangeEnd={(v) => setPurchaseMultiplier(v)}
              />
            )}
          </VStack>
          <HStack w={"100%"}>
            <label htmlFor="purchaseLimit">Purchase Limit</label>
            <InfoTip label="This limit the number of tokens that can be purchased in the crowdsale" />
            <Spacer />
            <NumInputField
              id="purchaseLimit"
              defaultValue={purchaseLimit}
              min={1}
              onChange={(value) => setPurchaseLimit(value)}
            />
          </HStack>
          <HStack w={"100%"}>
            <label htmlFor="purchaseLimit">Purchase Terms</label>
            <InfoTip label="Upload purchase terms to IPFS for purchasers to sign as clickwrap agreement." />
            <Spacer />
            <Box>
              <FileUploader setFile={setFile}/>
              {/* <Button className="solid-btn" variant={"ghost"} h={"35px"} onClick={handleUpload}>Upload</Button>
              <input
                style={{display: "none"}}
                id="file"
                name="file"
                type="file"
                ref={hiddenFileInput}
                onChange={(e) => {
                  // setFile(e.target.files[0]);
                }}
              /> */}
            </Box>
          </HStack>
        </VStack>
      ) : null}

    </VStack>
  );
}

export default ChooseCrowdsale;
