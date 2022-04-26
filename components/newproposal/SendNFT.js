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
  Box,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toDecimals, fromDecimals } from "../../utils/formatters";
import { tokens } from "../../constants/tokens";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import ProposalDescription from "../elements/ProposalDescription";
import { uploadIpfs } from "../tools/ipfsHelpers";
import { validateEns } from "../tools/ensHelpers";

export default function SendNFT() {
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
    append({ address: "" }); // add first recipient input field
  }, [append]);

  const submitProposal = async (values) => {
    value.setLoading(true);

    var { recipients } = values; // this must contain any inputs from custom forms

    // Configure proposal type
    const proposalType_ = 2;

    // Configure description param and upload to IPFS if necessary
    let description;
    (note && file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : (description = "none");
    (note) ? description = note : description = "none";
    (file) ? description = await uploadIpfs(dao.address, "Mint Proposal", file.name) : null;

    // Configure accounts & amounts param and validate address or ENS
    let recipients_ = [];
    let nftAddress_ = []; // For CALL
    let amounts_ = [];
    for (let i = 0; i < recipients.length; i++) {
      const recipientAddress = await validateEns(recipients[i].address, web3, value)
      if (recipientAddress === undefined) {
        value.setLoading(false);
        return;
      }
      recipients_.push(recipientAddress);
      nftAddress_.push(recipients[i].token)
      amounts_.push(0);
    }

    // Configure paylods params
    let payloads_ = [];
    for (let i = 0; i < recipients.length; i++) {
      const nftAbi = require("../../abi/ERC721.json");
      let address_ = recipients[i].token;
      let tokenId = recipients[i].tokenId;

      const tokenContract = new web3.eth.Contract(nftAbi, address_);
      var payload_ = tokenContract.methods
        .transferFrom(dao.address, recipients_[i], tokenId)
        .encodeABI();
      payloads_.push(payload_);
    }

    console.log(proposalType_, description, recipients_, nftAddress_, amounts_, payloads_);
    try {
      const instance = new web3.eth.Contract(abi, address);
      let result = await instance.methods
        .propose(proposalType_, description, nftAddress_, amounts_, payloads_)
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
      <VStack width="100%">
        <HStack w="100%">
          <Text fontSize="14px">Send DAO NFTs to the following addresses</Text>
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
              // justifyContent="center"
              key={recipient.id}
            >
              <HStack w={"100%"} spacing={4}>
                <Stack w={"40%"}>
                  <Controller
                    name={`recipients.${index}.address`}
                    control={control}
                    defaultValue={recipient.address}
                    render={({ field }) => (
                      <FormControl>
                        {/* <FormLabel
                      fontWeight="600"
                      htmlFor={`recipients.${index}.address`}
                    >
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
                <Stack w={"40%"}>

                  <Controller
                    name={`recipients.${index}.token`}
                    control={control}
                    defaultValue={recipient.token}
                    render={({ field }) => (
                      <FormControl>
                        {/* <FormLabel
                      fontWeight="600"
                      htmlFor={`recipients.${index}.token`}
                    >
                      Token
                    </FormLabel> */}
                        <Input
                          placeholder="NFT Token Contract"
                          {...field}
                          {...register(`recipients.${index}.token`, {
                            required: "You must specify NFT contract address!",
                          })}
                        />
                      </FormControl>
                    )}
                  />
                </Stack>
                <Stack w={"15%"}>

                  <Controller
                    name={`recipients.${index}.tokenId`}
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        {/* <FormLabel
                      fontWeight="600"
                      htmlFor={`recipients.${index}.tokenId`}
                    >
                      Token Id
                    </FormLabel> */}
                        <Input
                          placeholder="Token ID"
                          {...field}
                          {...register(`recipients.${index}.tokenId`, {
                            required: "You must specify NFT token Id!",
                          })}
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
        <br />
        <Button
          className="solid-btn"
          onClick={handleSubmit(submitProposal)}
        >
          Submit Proposal
        </Button>
      </VStack>
    </form>
  );
}
