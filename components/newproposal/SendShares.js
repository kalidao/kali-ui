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
  VStack,
  HStack,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Spacer,
  IconButton,
  Center
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toDecimals } from "../../utils/formatters";
import DeleteButton from "../elements/DeleteButton";
import SolidButton from "../elements/SolidButton";
import { AiOutlineDelete } from "react-icons/ai";

export default function SendShares() {
  const value = useContext(AppContext);
  const { web3, loading, account, address, chainId, abi } = value.state;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipients",
  });

  useEffect(() => {
    append({ address: "" }); // add first recipient input field
  }, [append]);

  const submitProposal = async (values) => {
    value.setLoading(true);

    try {
      var { description_, recipients } = values; // this must contain any inputs from custom forms
      console.log(values);
      let amounts_ = [];
      for (let i = 0; i < recipients.length; i++) {
        let element = document.getElementById(`recipients.${i}.share`);
        let value = element.value;
        amounts_.push(toDecimals(value, 18));
      }
      console.log("Shares Array", amounts_);

      // voters ENS check
      let accounts_ = [];
      for (let i = 0; i < recipients.length; i++) {
        if (web3.utils.isAddress(recipients[i].address) == false) {
          value.toast(recipients[i].address + " is not a valid Ethereum address.");
          return;
        }
        accounts_.push(recipients[i].address);
      }
      console.log("Voters Array", accounts_);

      const proposalType_ = 0;

      let payloads_ = [];
      for (let i = 0; i < recipients.length; i++) {
        payloads_.push("0x");
      }
      console.log(payloads_);
      console.log(proposalType_, description_, accounts_, amounts_, payloads_);
      const instance = new web3.eth.Contract(abi, address);

      try {
        let result = await instance.methods
          .propose(proposalType_, description_, accounts_, amounts_, payloads_)
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
    <form onSubmit={handleSubmit(submitProposal)}>
      <VStack width="100%">
        <Controller
          name="description_"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel htmlFor="description_">Description</FormLabel>
              <Textarea
                placeholder=". . ."
                {...field}
                {...register(`description_`, {
                  required: "Please enter a description.",
                })}
              />
            </FormControl>
          )}
        />

        <List spacing={2} width="100%" className="alternating-list">
          {fields.map((recipient, index) => (
            <ListItem
              display="flex"
              flexDirection="row"
              alignContent="center"
              justifyContent="center"
              key={recipient.id}
            >
              <Controller
                name={`recipients.${index}.address`}
                control={control}
                defaultValue={recipient.address}
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor={`recipients.${index}.address`}>
                      recipient
                    </FormLabel>
                    <Input
                      className="member-address"
                      placeholder="0x address"
                      {...field}
                      {...register(`recipients.${index}.address`, {
                        required: "You must assign share!",
                      })}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name={`recipients.${index}.share`}
                control={control}
                defaultValue={recipient.share}
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor={`recipients.${index}.share`}>
                      Shares
                    </FormLabel>
                    <NumInputField
                      min="1"
                      defaultValue="1"
                      id={`recipients.${index}.share`}
                    />
                  </FormControl>
                )}
              />
              <IconButton
                className="delete-icon"
                aria-label="delete recipient"
                mt={8}
                ml={2}
                icon={<AiOutlineDelete />}
                onClick={() => remove(index)}
              />
            </ListItem>
          ))}
        </List>

        <HStack width="100%"><Spacer /><Button className="solid-btn" onClick={() => append({ address: "" })}>+Add Recipient</Button></HStack>

        <Center>
          <Button className="solid-btn" type="submit">Submit Proposal</Button>
        </Center>
      </VStack>
    </form>
  );
}
