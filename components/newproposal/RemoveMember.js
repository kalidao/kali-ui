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
  List,
  ListItem,
  FormControl,
  FormLabel,
  Center,
  HStack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import NumInputField from "../elements/NumInputField";
import DeleteButton from "../elements/DeleteButton";
import { AiOutlineDelete } from "react-icons/ai";
import { getDefaultProvider } from "@ethersproject/providers";

export default function SendShares() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao } = value.state;
  const [members, setMembers] = useState(null);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  useEffect(() => {
    append({ address: "" }); // add first member input field
  }, [append]);

  useEffect(() => {
    const getMembers = async () => {
      if (!members) {
        const members_ = await loadMembers();
        const _members = await convertAddressToEns(members_)
        console.log(_members)
        setMembers(_members)
      } else {
        return
      }
    }
    getMembers();
  }, [members]);

  const convertAddressToEns = async (addresses) => {
    const provider = await getDefaultProvider();
    let addresses_;
    for (let i = 0; i < addresses.length; i++) {
      if (addresses[i]) {
        // console.log(addresses[i])
        let ens;
        ens = await provider.lookupAddress(addresses[i]).catch(() => {
          value.toast(ens + " is not a valid ENS.");
        });

        if (ens) {
          // console.log("ENS Checks out ", ens)
          addresses[i] = ens
          // addresses_.push(ens)
        } else {
          // console.log("ENS not found")
          addresses[i] = addresses[i]
          
        } 
      } else {
        console.log("RemoveMember.js - address not found")
      }
    }


    // console.log("this should be the output:", addresses)
    return addresses.sort();
  };

  const loadMembers = async () => {
    let members_ = [];
    for (var i = 0; i < dao["members"].length; i++) {
      const member = dao["members"][i].member
      members_.push(member);
      // setMembers([...members_]);
    }
    return members_
  };

  const submitProposal = async (values) => {
    event.preventDefault();
    value.setLoading(true);

    try {
      var { description_, members } = values; // this must contain any inputs from custom forms

      let accounts_ = [];
      for (let i = 0; i < members.length; i++) {
        if (members[i].address.slice(-4) === ".eth") {
          members[i].address = await web3.eth.ens
            .getAddress(members[i].address)
            .catch(() => {
              value.toast(members[i].address + " is not a valid ENS.");
            });
        }
        accounts_.push(members[i].address);
      }
      console.log("Voters Array", accounts_);

      const proposalType_ = 1;

      const instance = new web3.eth.Contract(abi, address);

      let amounts_ = [];
      for (let i = 0; i < members.length; i++) {
        const amount_ = await instance.methods
          .balanceOf(members[i].address)
          .call();
        amounts_.push(amount_);
      }
      console.log("Shares Array", amounts_);

      let payloads_ = [];
      for (let i = 0; i < accounts_.length; i++) {
        payloads_.push("0x");
      }

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
      <Stack>
        <Select placeholder={members ? "Pick a member" : "Loading Members and ENS names..."}>
          {/* {dao["members"].map((m, index) => (
            <option value={m["member"]}>{m["member"]}</option>
          ))} */}
          {members && members.map((m, index) => (
            <option value={m}>{m}</option>
          ))}
        </Select>
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

        {/* <List spacing={2} width="100%">
          {fields.map((member, index) => (
            <ListItem
              display="flex"
              flexDirection="row"
              alignContent="center"
              justifyContent="center"
              key={member.id}
              className="glass"
              p="10px 20px"
              borderRadius="2xl"
            >
              <Controller
                name={`members.${index}.address`}
                control={control}
                defaultValue={member.address}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor={`members.${index}.address`}>
                      Member {index + 1}
                    </FormLabel>
                    <Input
                      placeholder="0x address or ENS"
                      {...field}
                      {...register(`members.${index}.address`, {
                        required: "You must assign share!",
                      })}
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
        <HStack>
          <Spacer />
          <Button
            className="transparent-btn"
            onClick={() => append({ address: "" })}
          >
            +Add
          </Button>
        </HStack> */}

        <Center>
          <Button className="transparent-btn" type="submit">
            Submit Proposal
          </Button>
        </Center>
      </Stack>
    </form>
  );
}
