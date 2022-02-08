import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import {
  Textarea,
  Button,
  Input,
  Select,
  Text,
  HStack,
  VStack,
  Center
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import { votingPeriodUnits } from "../../constants/params";
import {
  votingPeriodToSeconds,
  convertVotingPeriod,
} from "../../utils/formatters";

export default function GovGrace() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao } = value.state;

  const submitProposal = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    try {
      let object = event.target;
      var array = [];
      for (let i = 0; i < object.length; i++) {
        array[object[i].name] = object[i].value;
      }

      var { description_, proposalType_, period_, unit_ } = array; // this must contain any inputs from custom forms
      console.log(array);
      var account_ = "0x0000000000000000000000000000000000000000";

      var amount_ = votingPeriodToSeconds(period_, unit_);
      console.log(amount_);

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
      <VStack alignItems="left">
        <Text>
          <b>Details</b>
        </Text>
        <Textarea name="description_" size="lg" placeholder=". . ." />
        <Text>
          Grace Period:
        </Text>
        <HStack>
          <NumInputField name="period_" />
          <Select name="unit_">
            {Object.entries(votingPeriodUnits).map(([k, v]) => (
              <option key={k} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </HStack>
        <Input type="hidden" name="proposalType_" value="4" />
        <Center>
          <Button className="solid-btn" type="submit">Submit Proposal</Button>
        </Center>
      </VStack>
    </form>
  );
}
