import React, { useState, useContext } from "react";
import {
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import AppContext from "../../context/AppContext";
import { toDecimals } from "../../utils/formatters";

const tokenABI = require("../../abi/ERC20.json");

export default function SAFE() {
  const [approve, setApprove] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [amount, setAmount] = useState(1);

  const value = useContext(AppContext);
  const { web3, dao, account } = value.state;

  const safeAddress = dao["extensions"]["safe"]["address"];
  const tokenAddress = dao["extensions"]["safe"]["details"]["purchaseToken"];

  const handleInvestment = async () => {
    if (!approve) {
      checkAllowance();
    } else {
      invest();
    }
  };

  const checkAllowance = async () => {
    value.setLoading(true);
    const token = new web3.eth.Contract(tokenABI, tokenAddress);
    const amount_ = toDecimals(amount, 18);

    try {
      const result = await token.methods.allowance(account, safeAddress).call();
      console.log("Allowance", result);

      if (result == 0) {
        setApprove(true);
        setSubmit(false);
      } else {
        invest();
      }
    } catch (e) {
      value.toast(e);
    }

    value.setLoading(false);
  };

  async function handleApprove() {
    value.setLoading(true);
    const token = new web3.eth.Contract(tokenABI, tokenAddress);
    const amount_ = web3.utils.toWei("100000");
    console.log("amount", amount_);
    try {
      const result = await token.methods
        .approve(safeAddress, amount_)
        .send({ from: account });
      console.log(result);
      setSubmit(true);
      setApprove(false);
    } catch (e) {
      value.toast(e);
    }
    value.setLoading(false);
  }

  async function invest() {
    value.setLoading(true);

    // initialise safe
    const safeAbi = require("../../abi/SafeMinter.json");
    const safe = new web3.eth.Contract(safeAbi, safeAddress);

    // params
    const details = "";
    const amount_ = toDecimals(amount, 18);

    console.log("amount", amount_);

    try {
      const result = await safe.methods
        .makeInvestment(amount_, details)
        .send({ from: account });
      console.log("result", result);
      value.setVisibleView(1);
    } catch (e) {
      value.toast(e);
    }

    value.setLoading(false);
  }

  return (
    <>
      {/* TODO: Add SAFE Investment List */}
      <VStack gap={2}>
        <HStack width="100%" borderRadius="2xl">
          <FormLabel htmlFor="amount">Investment Amount</FormLabel>
          <NumberInput
            min="0"
            name="amount"
            value={amount}
            onChange={(value) => setAmount(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text fontWeight={600}>DAI</Text>
        </HStack>
        {submit && (
          <Button className="transparent-btn" onClick={handleInvestment}>
            Submit
          </Button>
        )}
        {approve && (
          <Button className="transparent-btn" onClick={handleApprove}>
            Approve Token
          </Button>
        )}
      </VStack>
    </>
  );
}
