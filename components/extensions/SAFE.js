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
import { useForm, Controller } from "react-hook-form";
import { addresses } from "../../constants/addresses";
import AppContext from "../../context/AppContext";
import { getTokenName, toDecimals } from "../../utils/formatters";

const tokenABI = require("../../abi/ERC20.json");

export default function SAFE() {
  const [approve, setApprove] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [amount, setAmount] = useState(1);

  const value = useContext(AppContext);
  const { web3, dao, daoChain, account } = value.state;

  const safeAddress = dao["extensions"]["safe"]["address"];
  const tokenAddress = dao["extensions"]["safe"]["details"]["purchaseToken"];

  async function invest() {
    value.setLoading(true);
    const safeAbi = require("../../abi/SafeMinter.json");
    console.log("web3", web3);
    const safe = new web3.eth.Contract(safeAbi, safeAddress);
    const details = "TEST";
    console.log("amount", amount);

    const amount_ = toDecimals(amount, 18);
    try {
      try {
        const result = await safe.methods
          .makeInvestment(amount_, details)
          .send({ from: account });
        console.log("result", result);
        value.setVisibleView(1);
      } catch (e) {
        value.toast(e);
      }
    } catch (e) {
      value.toast(e);
    }
    value.setLoading(false);
  }

  const checkAllowance = async (token) => {
    value.setLoading(true);
    const token = new web3.eth.Contract(tokenABI, tokenAddress);
    try {
      const result = await token.methods.allowance(account, safeAddress).call();
      console.log("This is result for allowance - ", result);
      if (result == 0) {
        setApprove(true);
        setSubmit(false);
      } else {
        invest(amount_);
      }
    } catch (e) {
      value.toast(e);
    }
    value.setLoading(false);
  };

  async function handleApprove() {
    value.setLoading(true);
    const token = new web3.eth.Contract(tokenABI, tokenAddress);
    const amount_ = toDecimals(amount, 18);
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

  const handleInvestment = async () => {
    if (!approve) {
      checkAllowance();
    } else {
      try {
        invest();
      } catch (e) {
        value.toast(e);
      }
    }
  };

  return (
    <div>
      Add SAFE Investment List
      <VStack>
        <HStack>
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
          <Button className="solid-btn" onClick={handleInvestment}>
            Submit
          </Button>
        )}
        {approve && (
          <Button className="solid-btn" onClick={handleApprove}>
            Approve Token
          </Button>
        )}
      </VStack>
    </div>
  );
}
