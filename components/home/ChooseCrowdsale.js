import { useEffect, useState } from "react";
import {
  HStack,
  Checkbox,
  Text,
  VStack,
  Switch,
  Spacer,
  Button,
  Input,
} from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import InfoTip from "../elements/InfoTip";
import DateSelect from "../elements/DateSelect";
import Slider from "../elements/Slider";
import Select from "../elements/Select";
import NumInputField from "../elements/NumInputField";

function ChooseCrowdsale({ details, setDetails }) {
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

  const [listId, setListId] = useState(
    Boolean(details["extensions"]["crowdsale"]["listId"])
  );

  const [purchaseMultiplier, setPurchaseMultiplier] = useState(
    details["extensions"]["crowdsale"]["purchaseMultiplier"]
  );
  const [showSlider, setShowSlider] = useState(false);
  const [showCustomToken, setCustomToken] = useState(false);
  const [purchaseLimit, setPurchaseLimit] = useState(
    details["extensions"]["crowdsale"]["purchaseLimit"]
  );

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

  const handleCustomToken = (e) => {
    const token = e.target.value;
    console.log("token", token);
    details["extensions"]["crowdsale"]["purchaseToken"] = token;
    setDetails(details);
  };

  // const handlePurchaseLimit = (e) => {
  //   const limit = e.target.value;
  //   details["extensions"]["crowdsale"]["purchaseLimit"] = limit;
  //   setDetails(details);
  // };

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

  useEffect(() => {
    console.log("listId", listId);
    details["extensions"]["crowdsale"]["listId"] = Number(listId);
    setDetails(details);
  }, [listId]);

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

  return (
    <>
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
        <>
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
              <Input
                id="purchaseToken"
                placeholder="Enter Token Address"
                onChange={(value) => handleCustomToken(value)}
              />
            )}
          </VStack>
          <HStack w={"100%"}>
            <Text fontSize="md" htmlFor="listId">
              Accredited Investor Whitelist
            </Text>
            <InfoTip
              label={"Turning this on limits the crowdsale to Dos Commas"}
            />
            <Spacer />
            <Switch
              id="listId"
              size="md"
              colorScheme="red"
              defaultChecked={listId}
              onChange={() => setListId(!listId)}
            />
          </HStack>
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
        </>
      ) : null}
      
    </>
  );
}

export default ChooseCrowdsale;
