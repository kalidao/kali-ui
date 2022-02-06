import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Text,
  HStack,
  VStack,
  Textarea,
  Input,
  Center,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";

export default function GovPause() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao } = value.state;

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);
    console.log(value);

    try {
      let object = event.target;
      var array = [];
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value;
      }

      var { description_, amount_, proposalType_ } = array; // this must contain any inputs from custom forms

      var account_ = "0x0000000000000000000000000000000000000000";

      const payload_ = Array(0);

      const instance = new web3.eth.Contract(abi, address);

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

  return (
    <form onSubmit={submitProposal}>
      <VStack alignItems="left" spacing={2}>
        <Text fontWeight="800">Details</Text>
        <Textarea name="description_" size="lg" placeholder=". . ." />
        <Text>
          <i>
            This is a proposal to{" "}
            <b>{dao["token"]["paused"] == true ? "unpause" : "pause"}</b> share
            transferability.
          </i>
        </Text>
        <Input type="hidden" name="amount_" value="0" />
        <Input type="hidden" name="proposalType_" value="8" />
        <Center>
          <button className="solid-btn" type="submit">
            Submit Proposal
          </button>
        </Center>
      </VStack>
    </form>
  );
}
