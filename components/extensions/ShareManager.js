import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Text,
  Textarea,
  Stack,
  HStack,
  VStack,
  Center,
  Spacer,
  IconButton,
  Box,
  List,
  ListItem,
  FormControl,
  Select,
} from "@chakra-ui/react";
import NumInputField from "../elements/NumInputField";
import {
  toDecimals,
  unixToDate,
  convertRedeemables,
} from "../../utils/formatters";
import abi_ from "../../abi/KaliShareManager.json";
import { addresses } from "../../constants/addresses";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import { getDefaultProvider } from "@ethersproject/providers";

export default function ShareManager() {
  const value = useContext(AppContext);

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

  const { web3, chainId, account, address, dao } = value.state;
  const [members, setMembers] = useState(null);
  const shareManagerAddress = addresses[chainId]["access"];

  useEffect(() => {
    const getMembers = async () => {
      if (!members) {
        const members_ = await loadMembers();
        const _members = await convertAddressToEns(members_);
        _members.sort((a, b) => a.value - b.value);
        setMembers(_members);
      } else {
        return;
      }
    };
    getMembers();
  }, [members]);

  useEffect(() => {
    append();
  }, []);

  const convertAddressToEns = async (addresses) => {
    const provider = await getDefaultProvider();
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i].value) {
        // console.log(addresses[i])
        let ens;
        ens = await provider.lookupAddress(addresses[i].value).catch(() => {
          value.toast(ens + " is not a valid ENS.");
        });

        if (ens) {
          // console.log("ENS Checks out ", ens)
          addresses[i].label = ens;
          // addresses_.push(ens)
        } else {
          // console.log("ENS not found")
        }
      } else {
        console.log("RemoveMember.js - address not found");
      }
    }

    // console.log("this should be the output:", addresses);
    return addresses;
  };

  const loadMembers = async () => {
    let members_ = [];
    for (var i = 0; i < dao["members"].length; i++) {
      const member = {
        value: dao["members"][i].member,
        label:
          dao["members"][i].member.slice(0, 8) +
          "..." +
          dao["members"][i].member.slice(-6),
      };

      members_.push(member);
      setMembers([...members_]);
    }
    return members_;
  };

  const submitProposal = async (values) => {
    value.setLoading(true);

    var { recipients } = values;
    console.log("this is radio - ", recipients);
    let update;
    let extensionData = [];

    // Configure updates param
    for (let i = 0; i < recipients.length; i++) {
      // Get shares
      let amountElement = document.getElementById(`recipients.${i}.amount`);
      let amount_ = amountElement.value;

      if (recipients[i].mint == "mint") {
        update = web3.eth.abi.encodeParameters(
          ["address", "uint256", "bool"],
          [
            members[recipients[i].address].value,
            toDecimals(amount_, 18),
            true,
          ]
        );
      } else {
        update = web3.eth.abi.encodeParameters(
          ["address", "uint256", "bool"],
          [
            members[recipients[i].address].value,
            toDecimals(amount_, 18),
            false,
          ]
        );
      }

      extensionData.push(update);
      // console.log(updates)
    }
    try {
      const instance = new web3.eth.Contract(abi_, shareManagerAddress);
      console.log(extensionData);
      try {
        let result = await instance.methods
          .callExtension(address, extensionData)
          .send({ from: account });
        value.setVisibleView(1);
      } catch (e) {
        console.log(e);
        console.log("Something wrong when calling extension.");
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
      <VStack width="100%" align="flex-start">
        <HStack w="100%">
          <Text fontSize="14px">
            Select member to mint/burn their DAO tokens
          </Text>
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
              <HStack>
                <Controller
                  name={`recipients.${index}.address`}
                  control={control}
                  defaultValue={recipient.address}
                  render={({ field }) => (
                    <FormControl>
                      <Select
                        id={index}
                        {...register(`recipients.${index}.address`)}
                      >
                        <option>Select</option>
                        {members.map((member, index) => (
                          <option key={member.value} value={index}>
                            {member.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name={`recipients.${index}.mint`}
                  control={control}
                  defaultValue={recipient.mint}
                  render={({ field }) => (
                    <FormControl w={"30%"}>
                      <Select
                        id={index}
                        {...register(`recipients.${index}.mint`)}
                      >
                        <option>Select</option>
                        <option value={"mint"}>Mint</option>
                        <option value={"burn"}>Burn</option>
                      </Select>
                    </FormControl>
                  )}
                />
                {/* <Controller
                  name={`recipients.${index}.mint`}
                  control={control}
                  defaultValue={recipient.mint}
                  render={({ field }) => (
                    <FormControl w={"30%"} isRequired>
                      <RadioGroup
                        id={`recipients.${index}.mint`}
                        onChange={handleRadioSelection}
                      >
                        <HStack>
                          <Radio value={"true"}>Mint</Radio>
                          <Radio value={"false"}>Burn</Radio>
                        </HStack>
                      </RadioGroup>
                    </FormControl>
                  )}
                /> */}
                <Controller
                  name={`recipients.${index}.amount`}
                  control={control}
                  defaultValue={recipient.amount}
                  render={({ field }) => (
                    <FormControl w={"30%"} isRequired>
                      <NumInputField
                        min="0.0000001"
                        defaultValue="1"
                        id={`recipients.${index}.amount`}
                        // {...field}fv
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
