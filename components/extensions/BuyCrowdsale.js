import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Select,
  Text,
  Textarea,
  Stack,
  HStack,
  Center,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import {
  toDecimals,
  fromDecimals,
  unixToDate,
  getTokenName,
} from "../../utils/formatters";

export default function BuyCrowdsale() {
  const value = useContext(AppContext);
  const { web3, loading, account, address, abi, dao, chainId } = value.state;
  const [amt, setAmt] = useState(1); // amount to be spent on shares, not converted to wei/decimals
  const tokenName = getTokenName(
    dao["extensions"]["crowdsale"]["details"]["purchaseToken"],
    chainId
  );
  const purchaseToken =
    dao["extensions"]["crowdsale"]["details"]["purchaseToken"];
  console.log("TOKEN", tokenName);
  console.log("TOKEN", purchaseToken);
  const purchaseMultiplier =
    dao["extensions"]["crowdsale"]["details"]["purchaseMultiplier"];
  const purchaseLimit =
    dao["extensions"]["crowdsale"]["details"]["purchaseLimit"];
  const saleEnds = dao["extensions"]["crowdsale"]["details"]["saleEnds"];

  // no decimals in dao object
  const decimals = dao["extensions"]["crowdsale"]["details"]["decimals"];
  const extAddress = dao["extensions"]["crowdsale"]["address"];

  const approveSpend = async () => {
    try {
      value.setLoading(true);
      let amt_ = toDecimals(amt, decimals).toString(); // toWei() won't work for tokens with less than 18 decimals
      const abi_ = require("../../abi/ERC20.json");
      const instance_ = new web3.eth.Contract(abi_, purchaseToken);
      let result = await instance_.methods
        .approve(extAddress, amt_)
        .send({ from: account });
      value.setLoading(false);
    } catch (e) {
      value.toast(e);
    }
  };

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    try {
      let object = event.target;
      console.log("object", object);
      var array = [];
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value;
      }

      var { amount_ } = array; // this must contain any inputs from custom forms

      if (purchaseToken == "0x000000000000000000000000000000000000dEaD") {
        decimals = 18;
      }

      amount_ = toDecimals(amount_, decimals).toString();

      console.log("amount_", amount_);

      var value_ = 0;
      if (
        purchaseToken == "0x0000000000000000000000000000000000000000" ||
        purchaseToken == "0x000000000000000000000000000000000000dEaD"
      ) {
        value_ = amount_;
      }

      const saleAbi = require("../../abi/KaliDAOcrowdsale.json");

      const instance = new web3.eth.Contract(saleAbi, extAddress);

      try {
        let result = await instance.methods
          .callExtension(address, amount_)
          .send({ from: account, value: value_ });
        value.setVisibleView(1);
      } catch (e) {
        value.toast(e);
        value.setLoading(false);
      }
    } catch (e) {
      value.toast(e);
      value.setLoading(false);
    }

    value.setLoading(false);
  };

  const handleChange = (value) => setAmt(value);

  return (
    <>
      <form onSubmit={submitProposal}>
        <Stack>
          <Text>Sale Details</Text>
          <Text>
            Price: {1 / purchaseMultiplier} {tokenName} ({purchaseMultiplier}{" "}
            shares per {tokenName ? tokenName : "ETH"})
          </Text>
          <Text>Maximum shares allowed: {fromDecimals(purchaseLimit, 18)}</Text>
          <Text>Sale ends {unixToDate(saleEnds)}</Text>
          <HStack>
            <Text>
              <b>Purchase Amount ({tokenName ? tokenName : "ETH"}):</b>
            </Text>
            <NumInputField
              name="amount_"
              defaultValue={1}
              min=".000000000000000001"
              max={purchaseLimit / purchaseMultiplier}
              onChange={handleChange}
            />

            <Text>
              <b>Shares</b>
            </Text>
            <Input value={amt * purchaseMultiplier} disabled />
          </HStack>
          {purchaseToken != "0x0000000000000000000000000000000000000000" &&
          purchaseToken != "0x000000000000000000000000000000000000dEaD" ? (
            <Button onClick={approveSpend}>Approve</Button>
          ) : null}

          <Center>
            <Button className="solid-btn" type="submit">
              Buy Shares
            </Button>
          </Center>
        </Stack>
      </form>
    </>
  );
}
