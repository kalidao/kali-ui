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
  Stack,
  IconButton,
  Text,
  Box,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toDecimals, fromDecimals } from "../../utils/formatters";
import { tokens } from "../../constants/tokens";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import ProposalDescription from "../elements/ProposalDescription";
import { validateEns } from "../tools/ensHelpers";
import { uploadIpfs } from "../tools/ipfsHelpers";

export default function SendToken() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao, chainId } = value.state;
  const [selectedOptions, setSelectedOptions] = useState([]);

  // For Notes section
  const [doc, setDoc] = useState([]);
  const [note, setNote] = useState(null);
  const [file, setFile] = useState(null);

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
    append({ address: "" });
  }, [append]);

  const submitProposal = async (values) => {
    value.setLoading(true);

      var { recipients } = values;

      // Configure proposal type 
      const proposalType_ = 2;

      // Configure description param and upload to IPFS if necessary
      let description;
      (note && file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : (description = "none");
      (note) ? description = note : description = "none";
      (file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : null;

      // Configure accounts param and validate address or ENS
      let recipients_ = []; 
      let accounts_ = []; // For CALL
      for (let i = 0; i < recipients.length; i++) {
        const account = await validateEns(recipients[i].address, web3, value)
        if (account === undefined) {
          value.setLoading(false);
          return;
        }
        recipients_.push(account)

        // Replace accounts with token address to CALL token transfers via payload
        let address_;
        if (selectedOptions[i] == "ETH") {
          address_ = account;
        } else {
          address_ = tokens[chainId][selectedOptions[i]]["address"];
        }
        accounts_.push(address_);
      }

      // Configure token amounts param
      let amounts_ = [];
      for (let i = 0; i < recipients.length; i++) {
        let element = document.getElementById(`recipients.${i}.share`);
        let value_ = element.value;

        if (selectedOptions[i] == "ETH") {
          amounts_.push(toDecimals(value_, 18));
        } else {
          amounts_.push(0);
        }
      }

      // Configure payloads param
      let payloads_ = [];
      for (let i = 0; i < recipients.length; i++) {
        if (selectedOptions[i] == "ETH") {
          payloads_.push("0x");
        } else {
          const tokenAbi = require("../../abi/ERC20.json");
          let tokenAddress = tokens[chainId][selectedOptions[i]]["address"];
          // let decimals = tokens[chainId][selectedOptions[i]]["decimals"];
          let element = document.getElementById(`recipients.${i}.share`);
          let value_ = element.value;

          const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
          var payload_ = tokenContract.methods
            .transfer(
              recipients_[i],
              toDecimals(
                value_,
                tokens[chainId][selectedOptions[i]]["decimals"]
              )
            )
            .encodeABI();
          payloads_.push(payload_);
        }
      }

      console.log(proposalType_, description, recipients_, accounts_, amounts_, payloads_);
      try {
        const instance = new web3.eth.Contract(abi, address);
        let result = await instance.methods
          .propose(proposalType_, description, accounts_, amounts_, payloads_)
          .send({ from: account });
        value.setVisibleView(2);
      } catch (e) {
        value.toast(e);
        value.setLoading(false);
      }

    value.setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitProposal)}>
      <VStack width="100%" align="flex-start">
        <HStack w="100%">
          <Text fontSize="14px">Send ETH or ERC20 tokens to the following addresses</Text>
          <Spacer />
          <Button
            border="0px"
            variant="ghost"
            _hover={{
              background: "green.400",
            }}
            onClick={() => append({ address: "" })}
          >
            <AiOutlineUserAdd color="white" />
          </Button>
        </HStack>
        <Box h={"2%"} />
        <List width={"100%"} spacing={3}>
          {fields.map((recipient, index) => (
            <ListItem
              display="flex"
              flexDirection="row"
              alignContent="center"
              key={recipient.id}
            >
              <HStack w="100%" spacing={4}>
                <Stack w="60%">
                  <Controller
                    name={`recipients.${index}.address`}
                    control={control}
                    defaultValue={recipient.address}
                    render={({ field }) => (
                      <FormControl>
                        {/* <FormLabel htmlFor={`recipients.${index}.address`}>
                          Recipient {index + 1}
                        </FormLabel> */}
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
                </Stack>
                <Stack w="15%">
                  <Controller
                    name={`recipients.${index}.token`}
                    control={control}
                    defaultValue={recipient.token}
                    render={({ field }) => (
                      <FormControl>
                        {/* <FormLabel htmlFor={`recipients.${index}.token`}>
                          Token
                        </FormLabel> */}
                        <Select id={index} onChange={handleSelect}>
                          <option>Select</option>
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
                </Stack>
                <Stack w="15%">
                  <Controller
                    name={`recipients.${index}.share`}
                    control={control}
                    defaultValue={recipient.share}
                    render={({ field }) => (
                      <FormControl isRequired>
                        {/* <FormLabel htmlFor={`recipients.${index}.share`}>
                          Amount
                        </FormLabel> */}
                        <NumInputField
                          min="0.000000000000000001"
                          defaultValue="1"
                          id={`recipients.${index}.share`}
                        />
                      </FormControl>
                    )}
                  />
                </Stack>
                <IconButton
                  className="delete-icon"
                  aria-label="delete recipient"
                  icon={<AiOutlineDelete />}
                  onClick={() => remove(index)}
                />
              </HStack>
            </ListItem>
          ))}
        </List>
        <br />
        <ProposalDescription doc={doc} setDoc={setDoc} note={note} setNote={setNote} setFile={setFile} />
      </VStack>
      <br />
      <VStack w={"100%"}>
        <Button
          className="solid-btn"
          // onClick={handleSubmit(submitProposal)}
          type="submit"
        >
          Submit Proposal
        </Button>
      </VStack>
    </form>
  );
}
