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

  const handleSelect = async (event) => {
    // setDidSelect(true);
    // console.log(members);
    // members = members.filter((member) => member != members[event.target.value]);
    // setNewList(members);
  };

  useEffect(() => {
    const getMembers = async () => {
      if (!members) {
        const members_ = await loadMembers();
        const _members = await convertAddressToEns(members_);
        _members.sort((a, b) => a - b);
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
      if (addresses[i]) {
        let ens;
        ens = await provider.lookupAddress(addresses[i]).catch(() => {
          console.log(ens + " is not a valid ENS.");
        });

        if (ens) {
          addresses[i] = ens;
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
      const member = dao["members"][i].member;

      members_.push(member);
      setMembers([...members_]);
    }
    return members_;
  };

  const submitProposal = async (values) => {
    value.setLoading(true);

    var { recipients } = values;

    // Configure updates param
    let updates = [];
    for (let i = 0; i < recipients.length; i++) {
      let element = document.getElementById(`recipients.${i}.share`);
      let value = element.value;
      const update = {address: members[recipients[i].address], amount: toDecimals(value, 18)}
      console.log(update)
      updates.push(update);
    }
    console.log(updates)

    try {
      const instance = new web3.eth.Contract(abi_, shareManagerAddress);

      try {
        let result = await instance.methods
          .callExtension(address, updates)
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
      <VStack width="100%" align="flex-start">
        <HStack w="100%">
          <Text fontSize="14px">
            Mint DAO tokens to the following addresses
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
                  defaultValue={recipient.token}
                  render={({ field }) => (
                    <FormControl>
                      <Select id={index} 
                      // onChange={handleSelect} 
                      {...register(`recipients.${index}.address`, {
                          required: "You must assign share!",
                        })}>
                        <option>Select</option>
                        {members.map((member, index) => (
                              <option key={member} value={index}>
                                {member}
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
                    <FormControl w={"30%"} isRequired>
                      <NumInputField
                        min="1"
                        defaultValue="1"
                        {...field}
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
