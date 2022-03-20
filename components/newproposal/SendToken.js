import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Select,
  Flex,
  Textarea,
  VStack,
  HStack,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toDecimals, fromDecimals } from "../../utils/formatters";
import { tokens } from "../../constants/tokens";
import { AiOutlineDelete } from "react-icons/ai";

export default function SendToken() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao, chainId } = value.state;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (select) => {
    let value = select.target.value;
    let id = select.target.id;
    var array = selectedOptions;
    array[id] = value;
    setSelectedOptions(array);
    console.log(array);
  };

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
    //event.preventDefault();
    value.setLoading(true);
    console.log("event", event);

    try {
      var { description_, recipients } = values; // this must contain any inputs from custom forms
      console.log("values", values);

      const proposalType_ = 2;

      let amounts_ = [];

      for (let i = 0; i < recipients.length; i++) {
        // voters ENS check
        if (recipients[i].address.slice(-4) === ".eth") {
          recipients[i].address = await web3.eth.ens
            .getAddress(recipients[i].address)
            .catch(() => {
              value.toast(recipients[i].address + " is not a valid ENS.");
              value.setLoading(false);
            });
        }

        console.log(recipients[i].address);
        if (recipients[i].address === undefined) {
          return;
        }
        let element = document.getElementById(`recipients.${i}.share`);
        let value_ = element.value;

        if (selectedOptions[i] == "ETH") {
          amounts_.push(toDecimals(value_, 18));
        } else {
          amounts_.push(0);
        }
      }
      console.log("Amounts Array", amounts_);

      let accounts_ = [];
      for (let i = 0; i < recipients.length; i++) {
        let address_;
        if (selectedOptions[i] == "ETH") {
          address_ = recipients[i].address;
        } else {
          address_ = tokens[chainId][selectedOptions[i]]["address"];
        }
        accounts_.push(address_);
      }
      console.log("Tokens Array", accounts_);

      let payloads_ = [];
      for (let i = 0; i < recipients.length; i++) {
        if (selectedOptions[i] == "ETH") {
          payloads_.push("0x");
        } else {
          const ierc20 = require("../../abi/ERC20.json");
          let address_ = tokens[chainId][selectedOptions[i]]["address"];
          let decimals = tokens[chainId][selectedOptions[i]]["decimals"];
          let element = document.getElementById(`recipients.${i}.share`);
          let value_ = element.value;

          const tokenContract = new web3.eth.Contract(ierc20, address_);
          var payload_ = tokenContract.methods
            .transfer(
              recipients[i].address,
              toDecimals(
                value_,
                tokens[chainId][selectedOptions[i]]["decimals"]
              )
            )
            .encodeABI();
          payloads_.push(payload_);
        }
      }

      console.log(payloads_);

      const instance = new web3.eth.Contract(abi, address);

      try {
        let result = await instance.methods
          .propose(proposalType_, description_, accounts_, amounts_, payloads_)
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

        <List spacing={2} width="100%">
          {fields.map((recipient, index) => (
            <ListItem
              display="flex"
              flexDirection="row"
              alignContent="center"
              justifyContent="center"
              key={recipient.id}
              className="glass"
              p="10px 20px"
              borderRadius="2xl"
              spacing="2"
            >
              <Flex>
                <Controller
                  name={`recipients.${index}.address`}
                  control={control}
                  defaultValue={recipient.address}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor={`recipients.${index}.address`}>
                        Recipient {index + 1}
                      </FormLabel>
                      <Input
                        placeholder="0x address or ENS"
                        {...field}
                        {...register(`recipients.${index}.address`, {
                          required: "You must assign share!",
                        })}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name={`recipients.${index}.token`}
                  control={control}
                  defaultValue={recipient.token}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor={`recipients.${index}.token`}>
                        Token
                      </FormLabel>
                      <Select id={index} onChange={handleSelect}>
                        <option>Select a token</option>
                        <option value="ETH">ETH</option>
                        {Object.keys(tokens[chainId]).map((key, value) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))}
                      </Select>
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
                        Amount
                      </FormLabel>
                      <NumInputField
                        min="0.000000000000000001"
                        defaultValue="1"
                        id={`recipients.${index}.share`}
                      />
                    </FormControl>
                  )}
                />
              </Flex>
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

        <HStack width="100%">
          <Spacer />
          <Button className="solid-btn" onClick={() => append({ address: "" })}>
            +Add Recipient
          </Button>
        </HStack>

        <Button className="solid-btn" onClick={handleSubmit(submitProposal)}>
          Submit Proposal
        </Button>
      </VStack>
    </form>
  );
}
