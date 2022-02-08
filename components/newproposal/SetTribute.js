import React, { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import { Input, Button, Text, Textarea, Stack, Select, Center } from "@chakra-ui/react";
import { addresses } from "../../constants/addresses";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumInputField from "../elements/NumInputField";

export default function SetTribute() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, chainId, balances, daoChain } =
    value.state;

  const updateExtType = (e) => {
    let newValue = e.target.value;
    setExtType(newValue);
  };

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    try {
      let object = event.target;
      var array = [];
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value;
      }

      var { description_, account_, proposalType_ } = array; // this must contain any inputs from custom forms

      const amount_ = 1;

      const payload_ = Array(0);

      const instance = new web3.eth.Contract(abi, address);

      console.log(proposalType_,
      description_,
      [account_],
      [amount_],
      [payload_])

      try {
        let result = await instance.methods
          .propose(
            proposalType_,
            description_,
            [account_],
            [amount_],
            [payload_]
          )
          .send({ from: account });
        value.setVisibleView(2);
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

  return (
    <form onSubmit={submitProposal}>
      <Stack>
        <Text>
          <b>Details</b>
        </Text>
        <Textarea name="description_" size="lg" placeholder=". . ." />

        <Input type="hidden" name="proposalType_" value="9" />
        <Input
          type="hidden"
          name="account_"
          value={addresses[daoChain]["extensions"]["tribute"]}
        />
        <Center>
          <Button className="solid-btn" type="submit">Submit Proposal</Button>
        </Center>
      </Stack>
    </form>
  );
}
