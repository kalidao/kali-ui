import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Text,
  Textarea,
  Stack,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Center,
  VStack,
  HStack,
  Spacer,
  IconButton,
  Box,
} from "@chakra-ui/react";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import NumInputField from "../elements/NumInputField";
import DeleteButton from "../elements/DeleteButton";
import { AiOutlineDelete } from "react-icons/ai";
import { getDefaultProvider } from "@ethersproject/providers";

const styles={
  app:{
    backgroundColor:'rgba(0,0,0,0.1)',
    justifyItems:'center',
    alignItems:'center',
    display:'grid',
    height:'100vh',
    fontFamily:'Arial',
    color:'rgba(0,0,100,1)',
    gridTemplateColumns:'1fr',
    fontSize:25
  },
  select:{
    width:'100%',
    maxWidth:600
  }
}

export default function SendShares() {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao } = value.state;
  const [members, setMembers] = useState(null);
  const [selection, setSelection] = useState(null);
  const [file, setFile] = useState(null);
  const [didLockList, setDidLockList] = useState(false);
  const [membersToRemove, setMembersToRemove] = useState([]);
  let membersToRemove_ = [];

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "members",
  // });

  // useEffect(() => {
  //   append({ address: "" }); // add first member input field
  // }, [append]);

  useEffect(() => {
    const getMembers = async () => {
      if (!members) {
        const members_ = await loadMembers();
        // console.log(members_);
        const _members = await convertAddressToEns(members_);
        setMembers(_members);
      } else {
        return;
      }
    };
    getMembers();
  }, [members]);

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
          addresses[i].label = addresses[i].value.slice(0, 8) + "..." + addresses[i].value.slice(-6);
        }
      } else {
        console.log("RemoveMember.js - address not found");
      }
    }
    
    console.log("this should be the output:", addresses.sort((a, b) => {a.label < b.label}))
    return addresses.sort((a, b) => {a.label > b.label});
  };

  // const addToRemoveList = (member) => {
  //   console.log(member);
  //   membersToRemove_.push(member);

  //   // setMembersToRemove(membersToRemove_);

  //   console.log(membersToRemove_);
  // };

  // const lockList = () => {
  //   setMembersToRemove(membersToRemove_);
  // };

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

  const submitProposal = async () => {
    event.preventDefault();
    // value.setLoading(true);

    console.log(selection);
    // try {

    //   description_ = file.name;

    //   const proposalType_ = 1;

    //   const instance = new web3.eth.Contract(abi, address);

    //   let amounts_ = [];
    //   for (let i = 0; i < membersToRemove.length; i++) {
    //     const amount_ = await instance.methods
    //       .balanceOf(membersToRemove[i])
    //       .call();
    //     amounts_.push(amount_);
    //   }
    //   console.log("Shares Array", amounts_);

    //   let payloads_ = [];
    //   for (let i = 0; i < membersToRemove.length; i++) {
    //     payloads_.push("0x");
    //   }

    //   try {
    //     let result = await instance.methods
    //       .propose(
    //         proposalType_,
    //         description_,
    //         membersToRemove,
    //         amounts_,
    //         payloads_
    //       )
    //       .send({ from: account });
    //     value.setVisibleView(2);
    //   } catch (e) {
    //     value.toast(e);
    //     value.setLoading(false);
    //   }
    // } catch (e) {
    //   value.toast(e);
    //   value.setLoading(false);
    // }

    // value.setLoading(false);
  };

  return (
    <VStack align="flex-start" w="50%" spacing="5">
      <Text>
        <b>Select and Confirm Member(s) to Remove:</b>
      </Text>
      {/* <VStack align="flex-start">
        {console.log(membersToRemove)}
        {membersToRemove &&
          membersToRemove.map((member, index) => (
            <Text key={index}>
              {index + 1}. {member}
            </Text>
          ))}
      </VStack> */}
      <VStack align="flex-start">
        {/* <Text>Selected Members: </Text> */}
        {selection ? (
          <>
            {selection.map((member, index) => (
              <Text align="left" key={member.value}>{index+1}. {member.label}</Text>
            ))}
          </>
          
        ) : null}
      </VStack>
      <Box w={"100%"}>
        {/* <Select
          name="members"
          placeholder={
            members ? "Pick a member" : "Loading Members and ENS names..."
          }
          value={selection}
          onChange={(e) => {
            setSelection(e.target.value);
            console.log(selection)
          }}
        >
          {dao["members"].map((m, index) => (
            <option value={m["member"]}>{m["member"]}</option>
          ))}
          {members &&
            members.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
        </Select> */}
        <Select
          styles={styles}
          isMulti={true}
          value={selection}
          placeholder="Select member(s)"
          onChange={(e) => {
            setSelection(e);
          }}
          options={members}
        ></Select>
        {/* <Spacer />
        <Button
          variant="ghost"
          color="white"
          border="none"
          onClick={() => {
            addToRemoveList(selection);
          }}
        >
          ➕
        </Button>
        <Button variant="ghost" color="white" border="none" onClick={lockList}>
          {didLockList ? "🔒" : "🔓"}{" "}
        </Button> */}
      </Box>
      <br />
      <Text>
        <b>Notes:</b>
      </Text>
      <Box w="100%" pt="10px">
        <input
          id="file"
          name="file"
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </Box>
      <br />
      <VStack w="100%">
        <Button
          className="transparent-btn"
          type="submit"
          onClick={submitProposal}
        >
          Submit Proposal
        </Button>
      </VStack>
    </VStack>
  );
}
