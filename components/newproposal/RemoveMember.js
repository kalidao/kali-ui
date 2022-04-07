import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import {
  Input,
  Button,
  Text,
  Textarea,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import Select from "react-select";
import { getDefaultProvider } from "@ethersproject/providers";
import { uploadIpfs } from "../../utils/helpers";
import InfoTip from "../elements/InfoTip";

export default function SendShares() {
  const value = useContext(AppContext);
  const { web3, account, abi, address, dao } = value.state;
  const [members, setMembers] = useState(null);
  const [selection, setSelection] = useState(null);
  const [file, setFile] = useState(null);
  const [note, setNote] = useState(null);

  useEffect(() => {
    const getMembers = async () => {
      if (!members) {
        const members_ = await loadMembers();
        const _members = await convertAddressToEns(members_);
        _members.sort((a, b) => a.label - b.label);
        setMembers(_members);
      } else {
        // console.log("ooooooooooooops");
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
          addresses[i].label =
            addresses[i].value.slice(0, 8) +
            "..." +
            addresses[i].value.slice(-6);
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

  const submitProposal = async () => {
    event.preventDefault();
    let description_;

    try {
      if (note && file) {
        description_ = await uploadIpfs(dao["address"], file);
      } else if (note && !file) {
        description_ = note;
      } else if (!note && !file) {
        description_ = "";
      }

      const proposalType_ = 1;

      const instance = new web3.eth.Contract(abi, address);
      let accounts_ = [];
      for (let i = 0; i < selection.length; i++) {
        accounts_.push(selection[i].value);
      }

      let amounts_ = [];
      for (let i = 0; i < selection.length; i++) {
        const amount_ = await instance.methods
          .balanceOf(selection[i].value)
          .call();
        amounts_.push(amount_);
      }

      let payloads_ = [];
      for (let i = 0; i < selection.length; i++) {
        payloads_.push("0x");
      }

      console.log(
        "Shares Array",
        proposalType_,
        description_,
        accounts_,
        amounts_,
        payloads_
      );
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
      <VStack align="flex-start" w="50%" spacing="5">
        <Text>
          <b>Select and Confirm Member(s) to Remove:</b>
        </Text>
        <VStack align="flex-start">
          {selection ? (
            <>
              {selection.map((member, index) => (
                <Text align="left" key={member.value}>
                  {index + 1}. {member.label}
                </Text>
              ))}
            </>
          ) : null}
        </VStack>
        <Box w={"100%"}>
          <Select
            isMulti={true}
            value={selection}
            placeholder="Select member(s)"
            onChange={(e) => {
              setSelection(e);
            }}
            options={members}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary25: "purple",
                primary: "pink",
              },
            })}
          ></Select>
        </Box>
        <br />
        <HStack>
          <Text>
            <b>Notes:</b>
          </Text>
          <InfoTip
            label={
              "You may accompany this proposal with notes or a doc. Notes will be recorded directly onchain, while doc will be uploaded to IPFS. If both are supplied, note is ignored."
            }
          ></InfoTip>
        </HStack>
        <Box w="100%" pt="10px">
          <Textarea
            placeholder=". . ."
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <Box h="20px" />
          <Text>-- OR --</Text>
          <br />
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
