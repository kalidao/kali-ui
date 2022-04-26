import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Text,
  VStack,
  HStack,
  List,
  ListItem,
  FormControl,
  Spacer,
  IconButton,
  Box,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toDecimals } from "../../utils/formatters";
import ProposalDescription from "../elements/ProposalDescription";
import { uploadIpfs } from "../tools/ipfsHelpers";
import { validateEns } from "../tools/ensHelpers";

export default function SendShares() {
  const value = useContext(AppContext);
  const { web3, loading, account, address, chainId, dao, abi } = value.state;

  // For Notes section
  const [doc, setDoc] = useState([]);
  const [note, setNote] = useState(null);
  const [file, setFile] = useState(null);

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
    const proposalType_ = 0;

    // Configure description param and upload to IPFS if necessary
    let description;
    (note && file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : (description = "none");
    (note) ? description = note : (description = "none");
    (file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : null;

    // Configure accounts param and validate address or ENS
    let accounts_ = [];
    for (let i = 0; i < recipients.length; i++) {
      const account = await validateEns(recipients[i].address, web3, value)
      if (account === undefined) {
        value.setLoading(false);
        return;
      }
      accounts_.push(account);
    }

    // Configure token amounts param
    let amounts_ = [];
    for (let i = 0; i < recipients.length; i++) {
      let element = document.getElementById(`recipients.${i}.share`);
      let value = element.value;
      amounts_.push(toDecimals(value, 18));
    }

    // Configure payloads param
    let payloads_ = [];
    for (let i = 0; i < recipients.length; i++) {
      payloads_.push("0x");
    }

    // console.log(proposalType_, description, accounts_, amounts_, payloads_);
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
          <Text fontSize="14px">Mint DAO tokens to the following addresses</Text>
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
        <List w={"100%"} spacing={3}>
          {fields.map((recipient, index) => (
            <ListItem
              // display="flex"
              flexDirection="row"
              alignContent="center"
              // justifyContent="center"
              key={recipient.id}
            >
              <HStack >
                <Controller
                  name={`recipients.${index}.address`}
                  control={control}
                  defaultValue={recipient.address}
                  render={({ field }) => (
                    <FormControl w={"100%"} isRequired>
                      <Input
                        className="member-address"
                        placeholder="0xKALI or ENS"
                        fontSize={"md"}
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
                    <FormControl w={"30%"} isRequired>
                      <NumInputField
                        min="1"
                        defaultValue="1"
                        id={`recipients.${index}.share`}
                      />
                    </FormControl>
                  )}
                />
                <IconButton
                  w={"12%"}
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
        <Button className="solid-btn" type="submit">
          Submit Proposal
        </Button>
      </VStack>
    </form>
  );
}
